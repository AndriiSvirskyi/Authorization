import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';
import { NavLink } from 'react-router-dom'

class Header extends PureComponent {
    constructor(props){
        super(props);
        this.getPermission = ()=>this.props.getPermission(this.props.token)


        this.historyPush = () => {
            this.props.history.push('/')
        }
    }
    componentWillMount(){
        this.getPermission()
    }
    
    render() {
        return (
            <nav>
                <div className="navigation">
                    {!this.props.permission ?
                        <React.Fragment>
                            <div className="button"><NavLink activeClassName="active" exact to="/">Home</NavLink></div>
                            <div className="button"><NavLink activeClassName="active" to="/signin">Sign in</NavLink></div>
                            <div className="button"><NavLink activeClassName="active" to="/signup">Sign up</NavLink></div>
                        </React.Fragment>
                        : (
                            <React.Fragment>
                                <div className="button"><NavLink activeClassName="active" exact to="/">Home</NavLink></div>
                                <div className="button"><NavLink activeClassName="active" to="/users">Users</NavLink></div>
                                <div className="button" onClick={()=>this.props.signout(this.historyPush)}>Sign out</div>
                                <div className="button"><NavLink activeClassName="active" to="/settings">Settings</NavLink></div>
                            </React.Fragment>
                        )
                    }
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    permission: state.auth.permission,
});

export default connect(mapStateToProps, authActions)(Header);
