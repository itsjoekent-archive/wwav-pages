const express = require('express');
const secure = require('express-force-https');
const cors = require('cors');
const asyncRedis = require('async-redis');

const { default: ssr } = require('./ssr-compiled');

const { IS_PROD, PORT, REDIS_URL } = process.env;

const app = express();

if (IS_PROD) {
  app.use(secure);
}

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const client = asyncRedis.createClient({ url: REDIS_URL });

client.on('error', (error) => console.error(error));

function formatSlug(slug) {
  return encodeURIComponent(slug.toLowerCase());
}

app.get('/api/page/:slug', async function (req, res) {
  try {
    const { params: { slug } } = req;

    const page = await client.get(`page::${formatSlug(slug)}`);

    if (page) {
      res.json({ page: JSON.parse(page) });
      return;
    }

    res.status(404).json({ page: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Encountered error requesting page' });
  }
});

app.get('*', async function (req, res) {
  try {
    const result = await ssr(req.path);

    if (result instanceof Error) {
      throw result;
    }

    res.set('Content-Type', 'text/html');
    res.send(result);
  } catch (error) {
    console.error(error);

    res.set('Content-Type', 'text/html');
    res.status(500).send('error!!!');
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
