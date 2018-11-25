import React, { Component } from 'react';
import { userActions } from '../../../../actions'; 
import { connect } from 'react-redux';

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                mail: '',
                password: '',
                repeatPassword: '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
console.log(this.state)
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.mail && user.username && user.password) {
            if(user.password === user.repeatPassword){
                dispatch(userActions.register(user));
            }else{
                alert('Паролі не співпадають')
            }
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;

        return (
            <div className="form-wrap">
                <h1 className="title">Registration</h1>
                <form className="form" onSubmit={this.handleSubmit}>

                    <div className="login">
                        <label>Name</label>
                        <input type="text" name='username' value={user.username} onChange={this.handleChange} required></input>
                    </div>

                    <div className="password">
                        <label>Password</label>
                        <input type="password" name="password" value={user.password} onChange={this.handleChange} required></input>
                    </div>

                    <div className="password">
                        <label>Repeat password</label>
                        <input type="password" name="repeatPassword" value={user.repeatPassword} onChange={this.handleChange} required></input>
                    </div>

                    <div className="email">
                        <label >E-mail</label>
                        <input type="email" name="mail" value={user.mail} onChange={this.handleChange} required></input>
                    </div>

                    <button className="button-submit">Register</button> 
                </form> 
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    const alert = state.alert;
    return {
        registering,
        alert
    };
}

const connectedRegistration = connect(mapStateToProps)(Registration);
export { connectedRegistration as Registration };
