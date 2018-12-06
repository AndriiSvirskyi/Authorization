import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';
import { Link } from 'react-router-dom';

class ChangePassword extends Component {
constructor(props){
    super(props)
    this.state = {
        inputCurrentType: 'password',
        inputNewType: 'password'
    }
    this.inputCurrentType = this.inputCurrentType.bind(this);
    this.inputNewType = this.inputNewType.bind(this);
}
    onSubmit = data => {
        data.token = this.props.token;
        this.props.changePassword(data, () => {
        });
    }
    inputCurrentType() {
        this.state.inputCurrentType === "password" ? this.setState({ inputCurrentType: "text" }) : this.setState({inputCurrentType: "password"})   
    }

    inputNewType() {
        this.state.inputNewType === "password" ? this.setState({ inputNewType: "text" }) : this.setState({inputNewType: "password"})   
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
                                    <div className="input-wrap">
                                        <Field name="password" className="inputBox" type={this.state.inputCurrentType} component="input" autoComplete="on" />
                                        <div className="passwordCheck" onClick={this.inputCurrentType}></div>
                                    </div>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <div className="password">New password</div>
                                    <div className="input-wrap">
                                        <Field name="newPassword" className="inputBox" type={this.state.inputNewType} component="input" autoComplete="on"/>
                                        <div className="passwordCheck" onClick={this.inputNewType}></div>   
                                    </div>
                                </label>
                            </div>
                            <div className="button-link">
                                <button type="submit" className="button">Change password</button>
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
    messageChangePassword: state.auth.messageChangePassword,
    message: state.auth.message,
    token: state.auth.token,
    permission: state.auth.permission
});

export default connect(mapStateToProps, authActions)(ChangePassword);