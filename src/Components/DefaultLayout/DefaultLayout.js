import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
import routes from '../../router';
import Menu from './Menu';
import { getCurrentRoles, getUserId } from '../../core/GetRoles';
import Breadcrumbs from '../../core/Breadcumbs';
let role = getCurrentRoles();

class DefaultLayout extends Component {

  render() {
    return (
      // Hiển Thị Thanh NavBar gồm nút trang chủ, quản lý sinh viên, quản lý kì thi
      
      <div className="App">
        <Menu /> 

         {/* Breadcumbs giúp xác định vị trí trang đang ở đâu */}
        <Breadcrumbs />
        {/* Phân route của 2 chức năng chính của admin page */}
        <Switch>
          {routes.map((route, idx) => {
            return route.component ? (
              route.role == role || route.role == 0 ?
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