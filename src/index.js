import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain="dev-wvwsk10i.us.auth0.com" clientId="L7nq1h2aYZIEfd0pkxKa2xpT6U5Rd16l" redirectUri={window.location.origin}>
    <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


