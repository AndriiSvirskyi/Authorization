import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as authActions from '../../actions/auth';


class Header extends PureComponent {
    render() {
        return (
        <nav>
            <div>
                <div className="link-block">
                    <div className="button"><Link to="/">Home</Link></div>
                    <div className="button"><Link to="/content">Content</Link></div>
                    <div className="button"><Link to="/signin">Sign in</Link></div>
                    <div className="button"><Link to="/signup">Sign up</Link></div>
                </div>    
            </div> 
        </nav>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token
});

export default connect(mapStateToProps, authActions)(Header);
