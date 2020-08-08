const express = require('express');
const secure = require('express-force-https');
const cors = require('cors');

const { default: ssr } = require('./ssr-compiled');

const { IS_PROD, PORT } = process.env;

const app = express();

if (IS_PROD) {
  app.use(secure);
}

app.use(cors());
app.use(express.json());

// TODO: API endpoints

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
