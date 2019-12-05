import React, { Component } from 'react';
import Menu from '../Menu';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import routes from '../../router';
class Admin extends Component {
  showMenu = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((r, index) => {
        return <Route
          path={r.path}
          exact={r.exact}
          component={r.component}
          key={index}
        />
      })
    }
    return result;
  }
    render(){
  return (
    <Router>
    <Menu />
    <Switch>
            {this.showMenu(routes)};
    </Switch>
    </Router>
  );
 
}
}

export default Admin;
