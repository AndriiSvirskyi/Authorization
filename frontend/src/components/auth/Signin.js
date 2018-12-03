import React, { PureComponent } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';
import { Link } from 'react-router-dom';

class Signin extends PureComponent {
    onSubmit = data => {
        this.props.signin(data, () => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <Form
                onSubmit={this.onSubmit}
                render={({ handleSubmit }) => (
                    <div className="form-wrap">
                        <form className="form" onSubmit={handleSubmit}>

                        <h1>Authorization</h1>
                        <h4 className="alert">{this.props.messageSignIn}</h4>
                            <div>
                                <label>
                                    <div className="email">Email</div>
                                    <Field name="email" type="email" component="input" autoComplete="on" required />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <div className="password">Password</div>
                                    <Field name="password" type="password" component="input" autoComplete="on" required/>
                                </label>
                            </div>
                            <div className="button-link">
                                <button type="submit" className="button">Sign In</button>
                                <div className="button"><Link to="/recoverypassword">Recovery password</Link></div>
                            </div>
                        </form>
                    </div>
                )}
            />
        );
    }
}

const mapStateToProps = state => ({
    messageSignIn: state.auth.messageSignIn,
    token: state.auth.token,
});

export default connect(mapStateToProps, authActions)(Signin);
