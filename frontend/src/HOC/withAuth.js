import React, { PureComponent } from 'react';
import { connect } from 'react-redux';


const withAuth = WrappedComponent => {
  class ComposedComponent extends PureComponent {
    componentDidMount() {
      this.checkAuthorization();
    }

    componentDidUpdate() {
      this.checkAuthorization();
    }

    checkAuthorization() {
      if (!this.props.token) {
        this.props.history.push('/');
      }
    }

    render() {
      return (
        <WrappedComponent {...this.props}/>
      );
    }
  }

  const mapStateToProps = state => ({
    token: state.auth.token
  });

  return connect(mapStateToProps)(ComposedComponent);
};

export default withAuth;
