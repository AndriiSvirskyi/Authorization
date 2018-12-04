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
        console.log(this.props.users)
        return users.map((user, index) => {
            return <tr key={index}><td>{`User ${index+1}`}</td><td>{user.email}</td></tr>
        });
    }

    render() {
        return (
            <div className="content">
                <h2>Users list</h2>

                <table>
                    <tbody>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
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
