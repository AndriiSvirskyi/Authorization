import React, { PureComponent } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as authActions from '../../actions/auth';


class Signup extends PureComponent {
    onSubmit = data => {
        this.props.signup(data, () => {
            this.props.history.push('/content');
        });
    } 

    render() {
        return (
        <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit }) => (
            <div className="form-wrap">
                <form className="form" onSubmit={handleSubmit}>
                    <h3 style={{color: "red"}}>{this.props.message}</h3>
                <h1>Registration</h1>
                    <div>
                    <label>
                        <div className="email">Email</div>
                        <Field name="email" type="text" component="input" autoComplete="off"/>
                    </label>
                    </div>
                    <div>
                        <label>
                            <div className="password">Password</div>
                            <Field name="password" type="password" component="input" autoComplete="off"/>
                        </label>
                    </div>
                    <button type="submit" className="button">Sign Up</button>
                </form>
            </div>
            )}
        />
        );
    }
}

const mapStateToProps = state => ({
    message: state.auth.message
});

export default connect(mapStateToProps, authActions)(Signup);
