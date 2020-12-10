// IE 11 support
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// React
import React from 'react';
import ReactDOM from 'react-dom';
// LogRocket
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
// Sentry logging
import * as Sentry from '@sentry/react';
// Components
import App from './App';
import * as serviceWorker from './serviceWorker';

// If is prod build and is not netlify build (based on envs) then log using Sentry and Log Rocket
if (process.env.NODE_ENV === 'production') {
  // LOG ROCKET
  // Used to log/track console errors with LogRocket
  LogRocket.init('brya8q/wmn-disruption-sign-up', {
    browser: {
      urlSanitizer: (url) => {
        let sanitizedUrl = url;
        // redact the value of the query parameter secret_key
        sanitizedUrl = sanitizedUrl.replace(/name=([^&]*)/, 'name=**redacted**');
        sanitizedUrl = sanitizedUrl.replace(/email=([^&]*)/, 'email=**redacted**');
        sanitizedUrl = sanitizedUrl.replace(/user=([^&]*)/, 'user=**redacted**');
        // make sure you return the sanitized URL string
        return sanitizedUrl;
      },
    },
    // Sanitizer to stop the tracking of user input/text fields
    dom: {
      inputSanitizer: true,
    },
    // Hide sensitive network requests (calling API with form data)
    network: {
      requestSanitizer: (request) => {
        // if the url contains API URL
        if (
          request.url.toLowerCase().indexOf(process.env.REACT_APP_API_HOST.toLowerCase()) !== -1
        ) {
          // Null the body as it/ignore it as it contains user data
          request.body = null;
        }
        // make sure you return the modified request
        return request;
      },
    },
  });
  // after calling LogRocket.init()
  setupLogRocketReact(LogRocket); // Set-up Log Rocket React integration

  // Used to log/track console errors
  Sentry.init({
    dsn: 'https://b07ac88977e44a9a8b6c7dabf58fe190@o378798.ingest.sentry.io/5279827',
  });

  // Link Log Rocket and Sentry together
  LogRocket.getSessionURL((sessionURL) => {
    Sentry.configureScope((scope) => {
      scope.setExtra('sessionURL', sessionURL);
    });
  });
}

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
