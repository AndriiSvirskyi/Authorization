import { alertMessage } from '../constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertMessage.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertMessage.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertMessage.CLEAR:
      return {};
    default:
      return state
  }
}