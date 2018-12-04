import React, { PureComponent } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as authActions from '../../actions/auth';


class Signup extends PureComponent {
    onSubmit = data => {
        this.props.signup(data, () => {
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
                <h1>Registration</h1>
                <h3 className="error">{this.props.messageSignUp}</h3>
                    <div>
                        <label>
                            <div className="email">Email</div>
                            <Field name="email" type="email" component="input" autoComplete="off" required/>
                        </label>
                    </div>
                    <div>
                        <label>
                            <div className="password">Password</div>
                            <Field name="password" type="password" component="input" autoComplete="off"/>
                        </label>
                    </div>
                    <div className="button-link">
                        <button type="submit" className="button">Sign Up</button>
                    </div>
                </form>
            </div>
            )}
        />
        );
    }
}

const mapStateToProps = state => ({
    messageSignUp: state.auth.messageSignUp
});

export default connect(mapStateToProps, authActions)(Signup);
