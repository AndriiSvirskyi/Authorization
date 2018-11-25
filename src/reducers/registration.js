import { registrations } from '../constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case registration.REGISTER_REQUEST:
      return { registering: true };
    case registration.REGISTER_SUCCESS:
      return {};
    case registration.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}