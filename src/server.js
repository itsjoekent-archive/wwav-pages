const express = require('express');
const secure = require('express-force-https');
const cors = require('cors');
const xss = require('xss');
const asyncRedis = require('async-redis');
const rateLimit = require('express-rate-limit');
const RateLimitRedisStore = require('rate-limit-redis');

const { default: ssr } = require('./ssr-compiled');

const { IS_PROD, PORT, REDIS_URL, API_TOKEN } = process.env;

const app = express();

if (IS_PROD) {
  app.use(secure);
}

app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const client = asyncRedis.createClient({ url: REDIS_URL });

client.on('error', (error) => console.error(error));

const createPageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { error: 'Too many requests, please try again later.' },
  store: new RateLimitRedisStore({ client }),
});

app.use((req, res, next) => {
  if (IS_PROD && req.method === 'POST' && req.path === '/api/page') {
    createPageLimiter(req, res, next);
    return;
  }

  next();
});

function formatSlug(slug) {
  return encodeURIComponent((slug || '').toLowerCase());
}

app.get('/api/page/:slug', async function (req, res) {
  try {
    const { params: { slug } } = req;

    const page = await client.get(`page::${formatSlug(slug.replace('/', ''))}`);

    if (page) {
      const data = JSON.parse(page);
      delete data.email;

      res.json({ page: data });
      return;
    }

    res.status(404).json({ page: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Encountered error requesting page' });
  }
});

app.post('/api/page', async function (req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      slug,
      title,
      promptAnswer,
      gifTitle,
      gifUrl,
    } = req.body;

    const labelMap = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      slug: 'Page URL',
      title: 'Title',
      promptAnswer: 'Voting prompt',
    };

    const required = [
      'firstName',
      'lastName',
      'email',
      'slug',
      'title',
      'promptAnswer',
    ];

    const validation = {};

    required.forEach((key) => {
      if (!req.body[key]) {
        validation[key] = `${labelMap[key]} is required.`;
      }
    });

    if (!validation['email'] && !/\S+@\S+\.\S+/.test(email)) {
      validation['email'] = 'Incorrect email format.';
    }

    if (!validation['slug'] && !/^[a-zA-Z0-9-_]+$/.test(slug)) {
      validation['slug'] = 'Page URL can only contain letters, numbers, dashes and underscores.';
    }

    if (!validation['slug'] && (slug || '').length > 30) {
      validation['slug'] = 'Page path must be 30 characters or less.';
    }

    if (!validation['title'] && (title || '').length > 140) {
      validation['title'] = 'Page title must be 140 characters or less.';
    }

    if (!validation['promptAnswer'] && (promptAnswer || '').length > 2000) {
      validation['promptAnswer'] = 'Response must be 2000 characters or less.';
    }

    // TODO: Profanity filter

    if (gifUrl && !gifUrl.includes('.giphy.com')) {
      validation['gifUrl'] = 'Must be a Giphy link.';
    }

    const formattedSlug = formatSlug(slug);
    const key = `page::${formattedSlug}`;

    const slugExists = await client.exists(key);

    if (slugExists && !validation['slug']) {
      validation['slug'] = 'Sorry, this path is already in use!';
    }

    if (Object.values(validation).length) {
      res.status(400).json({ error: Object.values(validation).join(', ') });
      return;
    }

    const page = {
      slug: formattedSlug,
      firstName: xss(firstName),
      lastName: xss(lastName),
      email,
      title: xss(title),
      promptAnswer: xss(promptAnswer),
      gifUrl: gifUrl || 'https://media2.giphy.com/media/fq8QIzdyDsjiY46XNJ/giphy.gif',
      gifTitle: 'When We All Vote logo animation',
      totalSignups: 0,
      createdAt: Date.now(),
    };

    await client.set(key, JSON.stringify(page));

    res.json({ page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Encountered error building page' });
  }
});

app.post('/api/page/:slug/count', async function (req, res) {
  try {
    const {
      params: { slug },
      query: { token },
      body: { count },
    } = req;

    if (token !== API_TOKEN) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    const key = `page::${formatSlug(slug.replace('/', ''))}`
    const page = await client.get(key);

    if (!page) {
      res.status(404).json({ error: 'Page does not exist for the given slug' });
      return;
    }

    if (isNaN(parseInt(count))) {
      res.status(400).json({ error: 'Count is not a number' });
      return;
    }

    await client.set(key, JSON.stringify({
      ...JSON.parse(page),
      totalSignups: parseInt(count),
    }));

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Encountered error setting page count' });
  }
});

// TODO: A secret delete path

app.get('*', async function (req, res) {
  try {
    const result = await ssr(req.path, client);

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
