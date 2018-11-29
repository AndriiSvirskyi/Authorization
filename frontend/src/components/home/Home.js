import React, { Component } from 'react';
import * as authActions from '../../actions/auth';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div>
                This is home
            </div>
        );
    }
}
const mapStateToProps = state => ({
    message: state.auth.message,
    token: state.auth.token
});
export default connect(mapStateToProps, authActions)(Home);