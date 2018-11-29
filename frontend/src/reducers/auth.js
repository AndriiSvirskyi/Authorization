import { AUTH, ERROR, USERS } from '../actions/types';

const INITIAL_STATE = {
  token: '',
  message: '',
  users: '',
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
    case USERS:
      return {
        users: action.users,
        token: action.token,
    }
    default:
      return state;
  }
};
