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
    renderUser (users) {
        return users.map((user, index) => {
            return <tr key={index}><td>{user.email}</td><td>{user.name}</td><td>{user.birthday}</td><td>{user.status}</td></tr>
        });
    }

    render() {
        console.log(this.props.users)
        return (
            <div className="content">
                <h2>Users list</h2>

                <table>
                    <tbody>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Status</th>
                    </tr>
                    {this.props.users ? this.renderUser(this.props.users) : null}
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    message: state.auth.message,
    token: state.auth.token,
    users: state.auth.users,
    permission: state.auth.permission
});

export default connect(mapStateToProps, authActions)(Users);
