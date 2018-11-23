import React, { Component } from 'react';
class PasswordRecovery extends Component {

    render() {
        return (
            <div className="form-wrap">
                <h1 className="title">Password recovery</h1>
                <form method="post" className="form" action="form.php">

                    <div className="email">
                        <label>E-mail</label>
                        <input type="email" required></input>
                    </div>

                    <button type="submit" className="button-submit">Send</button>
                </form> 
            </div>
        );
    }
}

export default PasswordRecovery;
