import React, { Component } from 'react';
import * as authActions from '../../actions/auth';
import { connect } from 'react-redux';
import ChangePassword from '../auth/changePassword'
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

class Settings extends Component {
    constructor(props){
        super(props)
        this.state = {
            changePassword: false,
            addInformation: false,
        }
    }

    onSubmit = data => {
        data.token = this.props.token;
        this.props.addInformation(data);
    }

    addInformation = () => {
        if(this.state.changePassword === true){
            this.setState({changePassword: false})
        }
        this.setState({addInformation: true})
    }

    changePassword = () => {
        if(this.state.addInformation === true){
            this.setState({addInformation: false})
        }
        this.setState({changePassword: true})
    }

    render() {
        return (
            <div>
                <div className="settings">
                    <div className="button" onClick={this.addInformation}>Add information</div>
                    <div className="button" onClick={this.changePassword}>ChangePassword</div>
                </div>
                {this.state.changePassword ? <ChangePassword/> : null}
                {this.state.addInformation ? 
                <Form
                    onSubmit={this.onSubmit}
                    render={({ handleSubmit }) => (
                        <div className="form-wrap">
                            <form className="form" onSubmit={handleSubmit}>
                                <h1>Add information</h1>
                                <div className="message">
                                    <h4 className="alert">{this.props.message}</h4>
                                    <h4 className="success">{this.props.messageAddInfo}</h4>
                                </div>
                                
                                <div>
                                    <label>
                                        <div className="password">Name</div>
                                            <Field name="name" className="inputBox" type="text" component="input"/>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <div className="password">Birthday</div>
                                            <Field name="birthday" className="inputBox" type='text' component="input" autoComplete="on"/>
                                    </label>
                                </div>
                                <div className="button-link">
                                    <button type="submit" className="button">Add information</button>
                                </div>
                        </form>
                    </div>
                )}
            /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    message: state.auth.message,
    messageAddInfo: state.auth.messageAddInfo,
    token: state.auth.token,
    permission: state.auth.permission
});

export default connect(mapStateToProps, authActions)(Settings);