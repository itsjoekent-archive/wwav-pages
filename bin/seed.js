const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

client.on('error', (error) => console.error(error));

(async function() {
  console.log('Seeing pages...');

  await client.set('page::test', JSON.stringify({
    firstName: 'Barack',
    lastName: 'Obama',
    email: 'totallynotobama@gmail.com',
    title: 'There is too much at stake to sit this one out.'
    promptResponse: 'If you take that power and vote, something powerful happens. Change happens. Hope happens. And with each new step we take in the direction of fairness, and justice, and equality, and opportunity, hope spreads. Go vote!',
  }));
})();
