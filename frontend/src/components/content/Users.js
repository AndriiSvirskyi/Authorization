import React, { Component } from 'react';
import * as authActions from '../../actions/auth';
import { connect } from 'react-redux';

class Users extends Component {
    constructor(props){
        super(props)
        this.getUsers = ()=>this.props.getUsers(this.props.token)
    }
    componentWillMount() {
        this.getUsers()
    }
    renderUser = (users) =>{
        return users.map((user, index) => {
            return <li key={index}>{`email --- ${user.email} 
            password --- ${user.password}`}</li>
        });
    }
    render() {
        
        return (
            <div className="users-list">
                <ul>
                    {this.props.users ? this.renderUser(this.props.users) : <div>you are not authorization</div>}
                </ul>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    message: state.auth.message,
    token: state.auth.token,
    users: state.auth.users
});
export default connect(mapStateToProps, authActions)(Users);