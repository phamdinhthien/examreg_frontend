import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
import './App.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import DefaultLayout from './Components/DefaultLayout/DefaultLayout';
import Login from './Components/Login/Login';
import Alert from './core/Alert';
import { setAlert } from './core/Controller';
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
      <div>
        <Router >
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/login" name="Login Page" component={Login} />
            <PrivateRoute path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </Router>
        <Alert text="none" ref={this.alert} />
      </div>
    )
  }
}

export default App;