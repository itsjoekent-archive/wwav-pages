import React from 'react';
import RactDOM from 'react-dom';
import Application from './Application';

ReactDOM.hydrate(
  <Application {...window.__embeddedData} />,
  document.getElementById('react-app'),
);
