import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Registration, Authorization, Background, PasswordRecovery }  from './containers'
import ROUTES from './routes'

class App extends Component {
    render() {
        const { isAuthorized } = this.props;
        console.log(isAuthorized)
        let appRouter = (
            <div id='scene' style={{ maxWidth: '100%' }}>
                <Switch>
                    <Route exact path='/' component={Authorization}/>
                    <Route path={ROUTES.AUTHORIZATION} component={Authorization}/>
                    <Route path={ROUTES.REGISTRATION} component={Registration}/>
                    <Route path={ROUTES.PASSWORD_RECOVERY} component={PasswordRecovery}/>
                </Switch>
            </div>
        );

        if (isAuthorized) {
            appRouter = (
                <React.Fragment>
                    <div id="scene">
                        <Switch>
                            <Route exact path={ROUTES.CONTENT} component={Background}/>
                        </Switch>
                    </div>
                </React.Fragment>
            );
        }

        return (
            <div id='app-container'>
                {appRouter}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { auth } = state;
    return {
        isAuthorized: auth.isAuthorized,
    };
};

export default withRouter(connect(mapStateToProps, null)(App));
