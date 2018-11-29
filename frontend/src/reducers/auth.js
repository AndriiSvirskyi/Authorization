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
        token: action.token,
    }
    case CHANGE:
      return {
        message: action.message
    }
    case PERMISSION:
      return {
        message: action.message,
        permission: action.permission
    }

    default:
      return state;
  }
};
