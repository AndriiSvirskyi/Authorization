import { alertMessage } from '../constants';

export const alertActions = {
    success,
    error,
};

function success(message) {
    console.log(message)
    return { type: alertMessage.SUCCESS, message };
}

function error(message) {
    return { type: alertMessage.ERROR, message };
}