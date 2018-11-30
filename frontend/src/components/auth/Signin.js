import React, { PureComponent } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';
import { stat } from 'fs';

class Signin extends PureComponent {
    constructor(props){
        super(props)
        this.getPermission = ()=> this.props.getPermission(this.props.token)
}
componentDidMount(){
    this.getPermission();
}
    onSubmit = data => {
        this.props.signin(data, () => {
            this.props.history.push('/content');
        });
    }

    render() {
        
        return (
            this.props.permission ? 
                <div><span>You are already logged in, if you want to log in to another account, exit the current one</span>
                    <div className="button" onClick={this.props.signout}>Sign out</div>
                </div>
            :
            <Form
                onSubmit={this.onSubmit}
                render={({ handleSubmit }) => (
                    <div className="form-wrap">
                        <form className="form" onSubmit={handleSubmit}>

                        <h1>Authorization</h1>
                        <h4 className="alert">{this.props.message}</h4>
                            <div>
                                <label>
                                    <div className="email">Email</div>
                                    <Field name="email" type="text" component="input" autoComplete="on" />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <div className="password">Password</div>
                                    <Field name="password" type="password" component="input" autoComplete="on"/>
                                </label>
                            </div>
                            <button type="submit" className="button">Sign In</button>
                        </form>
                    </div>
                )}
            />
        );
    }
}

const mapStateToProps = state => ({
    message: state.auth.messageSignIn,
    token: state.auth.token,
    permission: state.auth.permission
});

export default connect(mapStateToProps, authActions)(Signin);
