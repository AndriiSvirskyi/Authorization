import React from 'react';
import './style.css'
import Header from './home/Header';
import { Route, Switch, withRouter } from 'react-router-dom';
import Signup from './auth/Signup';
import ChangePassword from './auth/changePassword';
import RecoveryPassword from './auth/recoveryPassword';
import Signin from './auth/Signin';
import Home from './home/Home';
import Settings from './content/Settings';
import Users from './content/Users';

const App = ({ location, history }) => {
  return (
    <React.Fragment>
      <Header history={history} location={location}/>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/users" component={Users} />
          <Route path="/settings" component={Settings} />
          <Route path="/changepassword" component={ChangePassword} />
          <Route path="/recoverypassword" component={RecoveryPassword} />
      </Switch>
    </React.Fragment>
  );
};

export default withRouter(App);
