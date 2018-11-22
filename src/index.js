import React, { Component } from 'react';
import {render} from 'react-dom';
import { Registration, Authorization }  from './containers'

class Login extends Component {
    constructor(props){
        super(props)
        this.login = true;
    }
    render() {
        return (
            this.login === true ? <Authorization/> : <Registration/> 
        );
    }
}

export default Login;

render(<Login/>, document.getElementById('root'))
