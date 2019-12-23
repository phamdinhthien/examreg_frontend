import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
import routes from '../../router';
import Menu from './Menu';
import { getCurrentRoles, getUserId } from '../../core/GetRoles';
let role = getCurrentRoles();

class DefaultLayout extends Component {

  render() {
    return (
        <div className="App">
          <Menu />
          <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    route.role == role || route.role == 0?
                  <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                    <route.component {...props} />
                  )} />
                  :
                  null
                  )
                    : (null);
                },
                )}
                <Redirect from="/" to="/home" />
              </Switch>
        </div>
    )
  }
}

export default DefaultLayout;