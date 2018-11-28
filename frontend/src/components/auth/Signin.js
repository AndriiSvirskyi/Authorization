import React, { PureComponent } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';
import { Link } from 'react-router-dom';

let z = ''
class Signin extends PureComponent {
    onSubmit = data => {
        this.props.signin(data, () => {
            this.props.history.push('/content');
        });
    }
    render() {
        
        return (
            this.props.token ? 
                <div>You are already logged in, if you want to log in to another account, exit the current one
                    <div className="button" onClick={this.props.signout}>Sign out</div>
                </div>
            :
            <Form
                onSubmit={this.onSubmit}
                render={({ handleSubmit }) => (
                    <div className="form-wrap">
                        <form className="form" onSubmit={handleSubmit}>

                        <h1>Authorization</h1>
                        <h4 style={{color: "red"}}>{this.props.message}</h4>
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
    message: state.auth.message,
    token: state.auth.token
});

export default connect(mapStateToProps, authActions)(Signin);
