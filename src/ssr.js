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
      @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;900&family=Open+Sans:wght@300;400;600;700;800&display=swap');

      /* http://meyerweb.com/eric/tools/css/reset/
         v2.0 | 20110126
         License: none (public domain)
      */

      html, body, div, span, applet, object, iframe,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, acronym, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strike, strong, sub, sup, tt, var,
      b, u, i, center,
      dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed,
      figure, figcaption, footer, header, hgroup,
      menu, nav, output, ruby, section, summary,
      time, mark, audio, video {
      	margin: 0;
      	padding: 0;
      	border: 0;
      	font-size: 100%;
      	font: inherit;
      	vertical-align: baseline;
      }
      /* HTML5 display-role reset for older browsers */
      article, aside, details, figcaption, figure,
      footer, header, hgroup, menu, nav, section {
      	display: block;
      }
      body {
      	line-height: 1;
      }
      ol, ul {
      	list-style: none;
      }
      blockquote, q {
      	quotes: none;
      }
      blockquote:before, blockquote:after,
      q:before, q:after {
      	content: '';
      	content: none;
      }
      table {
      	border-collapse: collapse;
      	border-spacing: 0;
      }
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

  const sheet = new ServerStyleSheet();

  let finalHtml = null;

  try {
    const html = ReactDOMServer.renderToString(
      sheet.collectStyles(<Application {...embeddedData} />)
    );

    const styleElements = sheet.getStyleTags();

    const helmet = Helmet.renderStatic();
    const headElements = `${helmet.title.toString()}\n${helmet.meta.toString()}`;

    finalHtml = htmlLayout
      .replace(/{{HEAD}}/g, headElements)
      .replace(/{{HTML}}/g, html)
      .replace(/{{REACT_DATA}}/g, JSON.stringify(embeddedData))
      .replace(/{{STYLE_TAGS}}/g, styleElements);
  } catch (error) {
    return error;
  } finally {
    sheet.seal();
  }

  return finalHtml;
}
