import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';

class recoveryPassword extends Component {

    onSubmit = data => {
        this.props.recovery(data, () => {
            this.props.history.push('/');
        });
    }
    render() {
        return (
            <div>
                <Form
                onSubmit={this.onSubmit}
                render={({ handleSubmit }) => (
                    <div className="form-wrap">
                        <form className="form" onSubmit={handleSubmit}>
                        <h1>Recovery password</h1>
                        <h4 className="scusses">{this.props.message}</h4>
                            <div>
                                <label>
                                    <div className="email">Enter your mail</div>
                                    <Field name="email" type="text" component="input" autoComplete="on" />
                                </label>
                            </div>
                            <button type="success" className="button">Recovery password</button>
                        </form>
                    </div>
                )}
            />  
            </div>
        );
    }
}

const mapStateToProps = state => ({
    message: state.auth.messageRecovery,
});

export default connect(mapStateToProps, authActions)(recoveryPassword);