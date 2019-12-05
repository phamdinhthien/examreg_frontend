import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
import routes from '../../router';
import Menu from './Menu';


class DefaultLayout extends Component {

  render() {
    return (
        <div className="App">
          <Menu />
          <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                    <route.component {...props} />
                  )} />)
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