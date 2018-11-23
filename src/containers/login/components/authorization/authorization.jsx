import React, { Component } from 'react';

class Authorization extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(e){
        e.preventDefault();
        
    }
    render() {
        return (
            <div className="form-wrap">
                <h1 className="title">Authorization</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="login">
                        <label>Name</label>
                        <input type="text" required></input>
                    </div>

                    <div className="password">
                        <label>Password</label>
                        <input type="password" required></input>
                    </div>

                    <button className="button-submit">Send</button> 
                    <div className="link">
                        <a href="/password-recovery">Forgot password</a>
                        <a href="/registration">Sign up</a>
                    </div>
                </form> 
            </div>
        );
    }
}

export default Authorization;
