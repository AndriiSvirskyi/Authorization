import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';
import { Link } from 'react-router-dom';

class ChangePassword extends Component {

    onSubmit = data => {
        data.token = this.props.token;
        this.props.changePassword(data, () => {
        });
    }
    render() {
        return (
            <Form
                onSubmit={this.onSubmit}
                render={({ handleSubmit }) => (
                    <div className="form-wrap">
                        <form className="form" onSubmit={handleSubmit}>
                            <h1>Change password</h1>
                            <div className="message">
                                <h4 className="alert">{this.props.message}</h4>
                                <h4 className="success">{this.props.messageChangePassword}</h4>
                            </div>
                            
                            <div>
                                <label>
                                    <div className="password">Current password</div>
                                    <Field name="password" type="text" component="input" autoComplete="on" />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <div className="password">New password</div>
                                    <Field name="newPassword" type="text" component="input" autoComplete="on"/>
                                </label>
                            </div>
                            <div className="button-link">
                                <button type="submit" className="button">Change password</button>
                                <div className="button"><Link to="/reccovery">Change password</Link></div>
                            </div>
                        </form>
                    </div>
                )}
            />
        );
    }
}
const mapStateToProps = state => ({
    messageChangePassword: state.auth.messageChangePassword,
    message: state.auth.message,
    token: state.auth.token,
    permission: state.auth.permission
});

export default connect(mapStateToProps, authActions)(ChangePassword);