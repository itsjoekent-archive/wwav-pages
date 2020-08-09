import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';

ReactDOM.hydrate(
  <Application {...window.__embeddedData} />,
  document.getElementById('react-app'),
);
