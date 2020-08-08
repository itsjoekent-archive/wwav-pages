import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import Application from './Application';
import { BUILD_PAGE_TYPE, REGISTER_PAGE_TYPE } from './pageTypes';

const htmlLayout = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {{HEAD}}

    <link rel="icon" href="https://www.edmarkey.com/wp-content/uploads/cropped-favicon-32x32.jpg" sizes="32x32">
    <link rel="icon" href="https://www.edmarkey.com/wp-content/uploads/cropped-favicon-192x192.jpg" sizes="192x192">
    <link rel="apple-touch-icon-precomposed" href="https://www.edmarkey.com/wp-content/uploads/cropped-favicon-180x180.jpg">
    <meta name="msapplication-TileImage" content="https://www.edmarkey.com/wp-content/uploads/cropped-favicon-270x270.jpg">

    <style>
      @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;900&family=Open+Sans:wght@300;400;700;800&display=swap');
    </style>

    {{STYLE_TAGS}}
  </head>
  <body>
    <div id="react-app">{{HTML}}</div>
    <script>
      window.__embeddedData = {{REACT_DATA}};
    </script>
    <script src="/build/main.js"></script>
  </body>
</html>
`;

export default async function ssr(path) {
  const embeddedData = {
    pageType: null,
  };

  if (path === '/') {
    embeddedData.pageType = BUILD_PAGE_TYPE;
    // ...
  }

  let html = null;
  let headElements = null;
  let styleElements = null;

  try {
    html = ReactDOMServer.renderToString(<Application {...embeddedData} />);
    // html = ReactDOMServer.renderToString(
    //   extractor.collectChunks(
    //     sheet.collectStyles(<Application {...data} />)
    //   )
    // );
  } catch (error) {
    return error;
  } finally {
    // sheet.seal();
  }

  return html;
}
