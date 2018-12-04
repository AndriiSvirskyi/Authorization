import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as authActions from '../../actions/auth';


class Header extends PureComponent {
    constructor(props){
        super(props);
        this.getPermission = ()=>this.props.getPermission(this.props.token)

        this.historyPush = () => {
            window.location.href = "/";
        }
    }

    componentDidUpdate(){
        this.getPermission()
    }
    
    render() {
        return (
        <nav>
            {!this.props.permission ?
                <div className="navigation">
                    <div className="button"><Link to="/">Home</Link></div>
                    <div className="button"><Link to="/signin">Sign in</Link></div>
                    <div className="button"><Link to="/signup">Sign up</Link></div>
                </div>
                : null
            }
            { this.props.permission ? <div className="navigation">
                <div className="button"><Link to="/">Home</Link></div>
                <div className="button"><Link to="/users">Users</Link></div>
                <div className="button"><Link to="/changepassword">Change password</Link></div>
                <div className="button" onClick={()=>this.props.signout(this.historyPush)}>Sign out</div>
            </div> : null}
        </nav>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    permission: state.auth.permission
});

export default connect(mapStateToProps, authActions)(Header);
