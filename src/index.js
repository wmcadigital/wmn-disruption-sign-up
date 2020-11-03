// IE 11 support
import 'react-app-polyfill/stable';
// React
import React from 'react';
import ReactDOM from 'react-dom';
// Sentry logging
import * as Sentry from '@sentry/react';
// Components
import App from './App';
import * as serviceWorker from './serviceWorker';

Sentry.init({
  dsn: 'https://b07ac88977e44a9a8b6c7dabf58fe190@o378798.ingest.sentry.io/5279827',
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
