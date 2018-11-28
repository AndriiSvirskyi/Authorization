import { AUTH, ERROR } from '../actions/types';

const INITIAL_STATE = {
  token: '',
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...INITIAL_STATE,
        token: action.token,
      };
    case ERROR:
      return {
        token: state.token,
        message: action.message
      };
    default:
      return state;
  }
};
