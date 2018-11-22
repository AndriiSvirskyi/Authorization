import React, { Component } from 'react';
import './style/form.css'
class Authorization extends Component {
    
    render() {
        return (
            <div className="form-wrap">
                <h1 className="title">Authorization</h1>
                <form method="post" className="form" action="form.php">
                    <div className="login">
                        <label>Name</label>
                        <input type="text" name="name" required></input>
                    </div>

                    <div className="password">
                        <label>Name</label>
                        <input type="text" name="name" required></input>
                    </div>
                    
                    <button type="submit" className="button-submit">Send</button> 
                </form> 
            </div>
        );
    }
}

export default Authorization;