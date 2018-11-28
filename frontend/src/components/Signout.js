import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth';


class Signout extends PureComponent {
  componentDidMount() {
    this.props.signout();
  }

  render() {
    return (
      <h3>see you</h3>
    );
  }
}

export default connect(null, authActions)(Signout);
