import { AUTH, ERROR, USERS, CHANGE, PERMISSION, RECOVERY } from '../actions/types';

const INITIAL_STATE = {
  token: '',
  message: '',
  messageSignIn : '',
  messageSignUp : '',
  messageChangePassword : '',
  users: '',
  permission: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...INITIAL_STATE,
        token: action.token,
        permission: action.permission
      };
    case ERROR:
      return {
        token: state.token,
        messageSignIn : action.messageSignIn,
        messageSignUp : action.messageSignUp,
        message: action.message,
        permission: action.permission
      };
    case USERS:
      return {
        users: action.users,
        token: state.token,
        permission: action.permission
    }
    case CHANGE:
      return {
        messageChangePassword: action.message,
        token: state.token,
        permission: action.permission
    }
    case PERMISSION:
      return {
        permission: action.permission,
        token: action.token,
    }
    case RECOVERY:
      return {
        messageRecovery: action.message,
    }

    default:
      return state;
  }
};
