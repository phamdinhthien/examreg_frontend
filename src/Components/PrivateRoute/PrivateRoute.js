import React from 'react'
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  var isLoggedIn = false;
  const access_token = localStorage.getItem('access_token_examreg');
  if(!access_token){
    isLoggedIn = false
  }else {
      isLoggedIn = true
  }
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
};
export default PrivateRoute;
