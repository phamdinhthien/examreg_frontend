import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
import './App.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import DefaultLayout from './Components/DefaultLayout/DefaultLayout';
import Login from './Components/Login/Login';
import Alert from './core/Alert';
import { setAlert } from './core/Controller';
import Home from './Components/Home/Home';
import Breadcrumbs from './core/Breadcumbs';

const Student = (props) => (
  <div>
    <h2>Student</h2>
  </div>
)
class App extends Component {
  constructor(props) {
    super(props);
    this.alert = React.createRef();
  }
  componentDidMount() {
    setAlert(this.alert);
  }
  render() {
    return (
      <Router >
        {this.props.children}
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/login" name="Login Page" component={Login} />
          <PrivateRoute path="/" name="Home" component={DefaultLayout} />
        </Switch>
        <Alert text="none" ref={this.alert} />
      </Router>
    )
  }
}

export default App;