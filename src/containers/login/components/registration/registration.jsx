import React, { Component } from 'react';

class Registration extends Component {
    render() {
        return (
            <div className="form-wrap">
                <h1 className="title">Registration</h1>
                <form method="post" className="form" action="form.php">
                    <div className="login">
                        <label>Name</label>
                        <input type="text" required></input>
                    </div>

                    <div className="password">
                        <label>Password</label>
                        <input type="password" required></input>
                    </div>

                    <div className="password">
                        <label>Repeat password</label>
                        <input type="password" required></input>
                    </div>

                    <div className="radio">
                        <span>Gender</span>
                        <label className="gender">
                            <input type="radio" name="gender" value="man"></input>
                            <div className="radio-control male">man</div>
                        </label>
                        <label className="gender">
                            <input type="radio" name="gender" value="woman"></input>
                            <div className="radio-control female">woman</div>
                        </label>
                    </div>

                    <div className="email">
                        <label >E-mail</label>
                        <input type="email"required></input>
                    </div>

                    <div className="select">
                        <label>City</label>
                        <select className="select-menu">
                            <option>Select a city of residence</option>
                            <option value="Lviv">Lviv</option> 
                            <option value="Mykolayiv">Mykolayiv</option> 
                            <option value="Kiev">Kiev</option> 
                            <option value="Kharkiv">Kharkiv</option> 
                        </select> 
                    </div> 

                    <button type="submit" className="button-submit">Send</button> 
                </form> 
            </div>
        );
    }
}

export default Registration;
