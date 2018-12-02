import React, { PureComponent } from 'react';
import { connect } from 'react-redux';


const withAuth = WrappedComponent => {
  class ComposedComponent extends PureComponent {
    constructor(props){
      super(props)
      this.getPermission = ()=> this.props.getPermission(this.props.token)
    }
    componentDidMount() {
      this.getPermission();
      this.checkAuthorization()
    }

    componentDidUpdate() {
      this.checkAuthorization()
    }

    checkAuthorization() {
      if (!this.props.permission) {
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
    token: state.auth.token,
    permission: state.auth.permission
  });

  return connect(mapStateToProps)(ComposedComponent);
};

export default withAuth;
