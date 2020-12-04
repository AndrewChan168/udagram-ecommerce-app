import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';
import { AdminContextProvider } from './contexts/AdminContext'

import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);
