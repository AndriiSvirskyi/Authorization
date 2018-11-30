import { AUTH, ERROR, USERS, CHANGE, PERMISSION } from '../actions/types';

const INITIAL_STATE = {
  token: '',
  message: '',
  users: '',
  permission: '',
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
        token: state.token,
    }
    case CHANGE:
      return {
        message: action.message,
        token: state.token,
    }
    case PERMISSION:
      return {
        message: action.message,
        permission: action.permission,
        token: action.token,
    }

    default:
      return state;
  }
};
