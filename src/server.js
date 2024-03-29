const { randomBytes } = require('crypto');
const express = require('express');
const secure = require('express-force-https');
const rateLimit = require('express-rate-limit');
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const xss = require('xss');
const asyncRedis = require('async-redis');
const RateLimitRedisStore = require('rate-limit-redis');
const Filter = require('bad-words');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const { default: ssr } = require('./ssr-compiled');

const {
  IS_PROD,
  PORT,
  REDIS_URL,
  API_TOKEN,
  ADMIN_PASS,
  SPREADSHEET_ID,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  PROGRAM,
} = process.env;

const app = express();
const filter = new Filter();

const BASIC_AUTH = { challenge: true, users: { 'admin': ADMIN_PASS } };

if (IS_PROD) {
  app.use(secure);
}

app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

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
      firstName: 'first name',
      lastName: 'last name',
      email: 'email',
      slug: 'page URL',
      title: 'title',
      promptAnswer: 'voting prompt',
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
        validation[key] = `${labelMap[key]} is required`;
      }
    });

    if (!validation['email'] && !/\S+@\S+\.\S+/.test(email)) {
      validation['email'] = 'incorrect email format';
    }

    if (!validation['slug'] && !/^[a-zA-Z0-9-_]+$/.test(slug)) {
      validation['slug'] = 'page URL can only contain letters, numbers, dashes and underscores';
    }

    if (!validation['slug'] && (slug || '').length > 30) {
      validation['slug'] = 'page path must be 30 characters or less';
    }

    if (!validation['title'] && (title || '').length > 140) {
      validation['title'] = 'page title must be 140 characters or less';
    }

    if (!validation['promptAnswer'] && (promptAnswer || '').length > 2000) {
      validation['promptAnswer'] = 'response must be 2000 characters or less';
    }

    const profanityCheck = [
      'firstName',
      'lastName',
      'slug',
      'title',
      'promptAnswer',
    ];

    profanityCheck.forEach((key) => {
      if (!validation[key] && filter.isProfane(req.body[key])) {
        validation[key] = `${labelMap[key]} cannot have profanity`;
      }
    });

    if (gifUrl && !gifUrl.includes('.giphy.com')) {
      validation['gifUrl'] = 'must be a Giphy link';
    }

    const formattedSlug = formatSlug(slug);
    const key = `page::${formattedSlug}`;

    const slugExists = await client.exists(key);

    if (slugExists && !validation['slug']) {
      validation['slug'] = 'this path is already in use';
    }

    if (Object.values(validation).length) {
      const validationValues = Object.values(validation);
      const joinedValidationMessage = `${validationValues.join(validationValues.length > 1 ? ', ' : '')}.`;
      const validationMessage = joinedValidationMessage.charAt(0).toUpperCase() + joinedValidationMessage.slice(1);

      res.status(400).json({ error: validationMessage });
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
      createdAt: Date.now(),
    };

    await client.set(key, JSON.stringify(page));

    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({ slug, firstName, lastName, email, title, promptAnswer, createdAt: new Date() });

    res.json({ page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Encountered error building page' });
  }
});

app.get('/:slug/delete', basicAuth(BASIC_AUTH), async function (req, res) {
  try {
    const { params: { slug } } = req;

    const key = `page::${formatSlug(slug.replace('/', ''))}`;
    const page = await client.get(key);

    if (!page) {
      res.status(404).send('Page does not exist!');
      return;
    }

    await client.del(key);
    res.status(200).send('Deleted! Poof!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Whoops, had an error. Try again?');
  }
});

app.get('*', async function (req, res) {
  try {
    const result = await ssr(req.path, client);

    if (result instanceof Error) {
      throw result;
    }

    res.set('Content-Type', 'text/html');
    res.send(result);
  } catch (error) {
    const errorId = randomBytes(8).toString('hex');
    error.message = error.message ? `[errorId=${errorId}] ${error.message}` : `[[errorId=${errorId}]] unspecified error message`;

    console.error(error);

    res.set('Content-Type', 'text/html');
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <title>Server error!</title>
          <meta name="title" content="Create your own voter registration page" />
          <meta name="og:title" content="Create your own voter registration page" />
          <meta name="twitter:title" content="Create your own voter registration page" />
          <meta name="description" content="Join When We All Vote to make sure every eligible voter is registered and ready to vote in every election." />
          <meta name="og:description" content="Join When We All Vote to make sure every eligible voter is registered and ready to vote in every election." />
          <meta name="twitter:description" content="Join When We All Vote to make sure every eligible voter is registered and ready to vote in every election." />

          <meta property="og:image" content="/meta-${PROGRAM}.png">
          <meta name="twitter:card" content="summary_large_image">
          <meta property="twitter:image" content="/meta-${PROGRAM}.png">

          <link rel="icon" type="image/x-icon" href="https://www.whenweallvote.org/wp-content/themes/whenwevote/favicon.png">

          <style>
            @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;900&family=Open+Sans:wght@300;400;600;700;800&display=swap');

            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 100vw;
              height: 100vh;
              margin: 0;
              padding: 0;
              background-color: #1B0E44;
            }

            h1 {
              font-family: 'Open Sans', sans-serif;
              font-weight: 700;
              font-size: 24px;
              line-height: 1.1;
              color: #FFFFFF;
              text-align: center;
              padding: 24px;
            }

            p {
              font-family: 'Open Sans', sans-serif;
              font-weight: 400;
              font-size: 12px;
              color: #FFFFFF;
              text-align: center;
            }

            @media (min-width: 1024px) {
              h1 {
                font-size: 36px;
              }
            }
          </style>
        </head>
        <body>
          <h1>We're experiencing some server errors, hang tight!</h1>
          <p>Error ID: ${errorId}</p>
        </body>
      </html>
    `);
  }
});

(async function() {
  try {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
    });

    await doc.loadInfo();

    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
