import React, { Component } from 'react';
import * as authActions from '../../actions/auth';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div className="content">
                <div className="b-text">This is home</div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    message: state.auth.message,
    token: state.auth.token
});
export default connect(mapStateToProps, authActions)(Home);