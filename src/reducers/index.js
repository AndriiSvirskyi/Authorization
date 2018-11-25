import { combineReducers } from 'redux';
import { registration } from './registration';
import { alert } from './alert.reducer'

const reducers = combineReducers({
    registration,
    alert
});

export default reducers;