import React, { Component } from 'react';
import withAuth from '../../HOC/withAuth';
import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';

class Content extends Component {
    render() {
        return (
            <div className="content">
                <h3>Site content</h3>
                <div className="button" onClick={()=>this.props.signout(this.props.history)}>Sign out</div>     
            </div>
        );
    }
}
const mapStateToProps = state => ({
    message: state.auth.message
});

export default connect(mapStateToProps, authActions)(withAuth(Content));
