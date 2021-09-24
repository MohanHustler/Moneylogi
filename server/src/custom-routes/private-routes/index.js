// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import User from '../../utils/user';

const { isAuthenticated } = new User();

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const userLoggedIn = isAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) =>
        userLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/signin', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoutes;
