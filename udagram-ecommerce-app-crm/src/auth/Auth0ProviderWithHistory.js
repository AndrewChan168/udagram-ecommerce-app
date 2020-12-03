import React from 'react';
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

/*
import fs from 'fs';
const {REACT_APP_AUTH0_DOMAIN,REACT_APP_AUTH0_CLIENT_ID,REACT_APP_AUTH0_AUDIENCE} = JSON.parse(fs.readFileSync('configure.json'));
*/
const REACT_APP_AUTH0_DOMAIN = "dev-ckdxh0zt.us.auth0.com";
const REACT_APP_AUTH0_CLIENT_ID = "5tmdvsByx7Y0vlevVaH2iiN5SMJ4KyKT";
const REACT_APP_AUTH0_AUDIENCE = "https://express.sample";


const Auth0ProviderWithHistory = ({children}) => {
  const history = useHistory();
  //const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  //const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  //const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  const domain = REACT_APP_AUTH0_DOMAIN;
  const clientId = REACT_APP_AUTH0_CLIENT_ID;
  const audience = REACT_APP_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;