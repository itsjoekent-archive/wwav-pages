const fetch = require('node-fetch');

// @NOTE: This URL will need to be later updated to the production URL (probably something like my.whenweallvote.org)
const BASE_URL = 'https://wwav-custom-pages-staging.herokuapp.com';
const API_TOKEN = '1354ertdffgdsfdsjfiu89ds0fopdsnfu';

// @TODO: replace with the output of the SQL query
// This data model represents all voter registrations grouped by source where the source contains "msv-custom-"
const registrations = {
  'msv-custom-example-slug-1': [
    {
      source: 'msv-custom-example-slug-1',
      email: '...',
    },
    {
      slug: 'msv-custom-example-slug-1',
      email: '...',
    },
  ],
  'msv-custom-example-slug-2': [
    {
      source: 'msv-custom-example-slug-2',
      email: '...',
    },
  ],
};

async function sendData() {
  console.log(`Updating ${Object.keys(registrations).length} sources in the API...`);

  for (const source of Object.keys(registrations)) {
    try {
      const slug = source.replace('msv-custom-', '');
      const count = registrations[source].length;

      const endpoint = `${BASE_URL}/api/page/${slug}/count?token=${API_TOKEN}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count }),
      });

      if (response.status !== 200) {
        throw new Error(`Failed to update slug:${slug} with count:${count}, status:${response.status}`);
      }
    } catch (error) {
      error.message = `${error.message || ''}; source=${source}`;
      console.error(error);
    }
  }

  console.log('Task completed, exiting....');
  process.exit(0);
}

sendData();
