import React, { Component } from 'react';
import * as authActions from '../../actions/auth';
import { connect } from 'react-redux';
import ChangePassword from '../auth/changePassword'
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

class Settings extends Component {
    constructor(props){
        super(props)
        this.textInput = React.createRef();
        this.alert = '';
        this.state = {
            changePassword: false,
            addInformation: false,
        }
    }

    onSubmit = data => {
        let birthday = this.textInput.current.state.state.values.birthday;
        if(!birthday || /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/.test(birthday) && birthday.split('.')[2] <= new Date().getFullYear()){
            data.token = this.props.token;
            this.alert = '';
            this.props.addInformation(data);
        }else{
            this.alert = 'incorrect date'
        }
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
                    ref = {this.textInput}
                    onSubmit={this.onSubmit}
                    render={({ handleSubmit }) => (
                        <div className="form-wrap">
                            <form className="form" onSubmit={handleSubmit}>
                                <h1>Add information</h1>
                                <div className="message">
                                    <h4 className="alert">{this.props.message || this.alert}</h4>
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
                                            <Field name="birthday" className="inputBox" ref type='text' component="input" autoComplete="on" placeholder="18.09.1995"/>
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