import React, { Component } from 'react';
import * as authActions from '../../actions/auth';
import { connect } from 'react-redux';
class Users extends Component {
    constructor(props){
        super(props)
        this.getUsers = ()=>this.props.getUsers(this.props.token)

    }

    componentWillMount(){
            this.getUsers()
        }
    renderUser (users, token) {
        return users.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.birthday}</td>
                    <td>{user.status}</td>
                    {this.props.permission === 'admin' ? 
                    <td>{user.status === "User" ? <div className="close" onClick={()=> this.props.deleteUser({user : user.email, token: token},()=>{this.getUsers(token)})}></div> : null}</td> : null}
                </tr>
            )
        });
    }

    render() {
        let token = this.props.token;
        return (
            <div className="content">
                <h2>Users list</h2>
                <div className="message">
                    <h4 className="alert">{this.props.message}</h4>
                    <h4 className="success">{this.props.messageDeleteUser}</h4>
                </div>
                <table>
                    <tbody>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Status</th>
                        {this.props.permission === "admin" ? <th>Delete user</th> : null}
                    </tr>
                    {this.props.users ? this.renderUser(this.props.users, token) : null}
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    messageDeleteUser: state.auth.messageDeleteUser,
    message: state.auth.message,
    token: state.auth.token,
    users: state.auth.users,
    permission: state.auth.permission
});

export default connect(mapStateToProps, authActions)(Users);
