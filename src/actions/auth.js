import { registrations } from '../constants';
import { auth } from '../services/auth.service';
import { alertActions } from './';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function register(user) {
    return dispatch => {
        dispatch(request(user));

        auth.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                }
            )
            .catch(error => {
                console.log(error.response.data.error)
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            });
    };

    function request(user) { return { type: registrations.REGISTER_REQUEST, user } }
    function success(user) { return { type: registrations.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: registrations.REGISTER_FAILURE, error } }
}

export const userActions = {
    register,
};
