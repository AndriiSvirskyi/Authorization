import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';

class ChangePassword extends Component {
    constructor(props){
        super(props)
        this.getPermission = ()=> this.props.getPermission(this.props.token)
    }
    componentDidMount() {
        this.getPermission()
    }
   
    onSubmit = data => {
        data.token = this.props.token;
        this.props.changePassword(data, () => {
            this.props.history.push('/');
        });
    }
    render() {
        return (
            <div>
                {this.props.permission ? 
                <Form
                onSubmit={this.onSubmit}
                render={({ handleSubmit }) => (
                    <div className="form-wrap">
                        <form className="form" onSubmit={handleSubmit}>
                        <h1>Change password</h1>
                        <h4 className="alert">{this.props.message}</h4>
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
                            <button type="submit" className="button">Change password</button>
                        </form>
                    </div>
                )}
            /> :
            <div className="alert">You are not authorization</div>
            }
                
            </div>
        );
    }
}
const mapStateToProps = state => ({
    message: state.auth.message,
    token: state.auth.token,
    permission: state.auth.permission
});

export default connect(mapStateToProps, authActions)(ChangePassword);
