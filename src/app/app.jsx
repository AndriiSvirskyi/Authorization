import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Authorization, Background, PasswordRecovery }  from '../containers'
import { Registration } from '../containers/login/components/registration/registration'
import ROUTES from '../routes'
import { alert } from '../actions';

class App extends Component {
    render() {
        return (
            <div id='app-container'>
                <Switch>
                    <Route exact path='/' component={Authorization}/>
                    <Route path={ROUTES.REGISTRATION} component={Registration}/>
                    <Route path={ROUTES.PASSWORD_RECOVERY} component={PasswordRecovery}/>
                    <Route path={ROUTES.CONTENT} component={Background}/>
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 