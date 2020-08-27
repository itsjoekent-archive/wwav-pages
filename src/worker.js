const { promisify } = require('util');
const cron = require('node-cron');
const fetch = require('node-fetch');
const asyncRedis = require('async-redis');
const parse = promisify(require('csv-parse'));

const {
  CIVIS_API_ENDPOINT,
  CIVIS_API_TOKEN,
  IS_PROD,
  PROGRAM,
  REDIS_URL,
} = process.env;

const client = asyncRedis.createClient({ url: REDIS_URL });

client.on('error', (error) => console.error(error));

async function importRegistrations() {
  console.log('Running importRegistrations() task...');

  try {
    const civisHeaders = { headers: { 'Authorization': `Bearer ${CIVIS_API_TOKEN}` } };
    const civisResponse = await fetch(CIVIS_API_ENDPOINT, { ...civisHeaders });
    const civisData = await civisResponse.json();

    const csvPath = civisData[0].output[0].path;
    const csvResponse = await fetch(csvPath);
    const csvText = await csvResponse.text();

    const registrations = await parse(csvText);
    registrations.shift();

    const sourcePrefix = `${PROGRAM}-custom-`;
    const programRegistrations = registrations.filter((row) => {
      return row[0].startsWith(sourcePrefix);
    });

    if (!programRegistrations.length) {
      console.log('No registrations, aborting importRegistrations() task early.');
      return;
    }

    console.log(`Importing ${programRegistrations.length} registration(s)...`);

    const insertionData = programRegistrations.reduce((acc, row) => [
      ...acc,
      `signups::${row[0].replace(sourcePrefix, '')}`,
      parseInt(row[1]),
    ], []);

    const start = Date.now();

    console.log(insertionData)
    await client.mset(...insertionData);

    console.log(`importRegistrations() task complete, Redis mset duration was ${(Date.now() - start) / 1000} second(s).`);
  } catch (error) {
    console.error(error);
  }
}

if (IS_PROD) {
  if (CIVIS_API_TOKEN && CIVIS_API_ENDPOINT && PROGRAM) {
    cron.schedule('* * * * *', importRegistrations);
  }
}
