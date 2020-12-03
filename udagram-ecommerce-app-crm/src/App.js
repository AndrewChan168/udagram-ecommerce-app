import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import ProtectedRoute from './auth/ProtectedRoute';
import NavBar from './components/navbar/NavBar'
import Home from './views/home/Home';
import Profile from './views/profile/Profile';
import Brand from './views/brands/Brand';
import Product from './views/products/Product';
import Loading from './views/Loading'

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return(
    <div id='app' className='d-flex flex-column h-100'>
      <NavBar />
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/brands" component={Brand} />
          <ProtectedRoute path="/products" component={Product} />
        </Switch>
      </div>
    </div>
  );
}

export default App;