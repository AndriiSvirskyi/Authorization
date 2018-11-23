import { combineReducers } from 'redux';
import authorization from '../actionTypes';

const isAuthorized = (state = false, { type, payload }) => {
    switch (type) {
        case authorization :
        if(payload.name === 'roller' && payload.password === 'war'){
            state = true
            return state;
        }
        break;
        default:
            return state;
    }
};

export default combineReducers({
    isAuthorized,
});
