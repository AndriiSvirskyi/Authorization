import axios from 'axios';
import { AUTH, ERROR, USERS, CHANGE, PERMISSION, RECOVERY } from './types';

const url = 'http://localhost:3001/api';

export const signup = (data, callback) => async dispatch => {
    try {
        const response = await axios.post(`${url}/signup`, data);
        const { token } = response.data;

        dispatch({
            type: AUTH,
            token
        });
        localStorage.setItem('token', token);

        callback();
    }
    catch (err) {
        const { message } = err.response.data;
        dispatch({
        type: ERROR,
        messageSignUp : message
        });
    }
};

export const signin = (data, callback) => async dispatch => {
    try {
        const response = await axios.post(`${url}/signin`, data);
        const { token } = response.data;
        dispatch({
            type: AUTH,
            token
        });
        localStorage.setItem('token', token);

        callback()
    } catch (err) {
        dispatch({
            type: ERROR,
            messageSignIn: 'You entered incorrect data'
        });
    }
};

export const signout = (history) => {
    localStorage.removeItem('token');
    return {
        type: AUTH,
        token: ''
    };
};

export const getUsers = (token) => async dispatch => {
    try {
        const AuthStr = 'Bearer '.concat(token); 
        const res = await axios.get(`${url}/users`, { headers: { Authorization: AuthStr } });
        const users = res.data;

        await dispatch({
            type: USERS,
            users : users,
            permission : true,
        })   
    } catch (err) {
        dispatch({
            type: ERROR,
            message: 'you dont can to get users'
        });
    }
};

export const getPermission = (token) => async dispatch => {
    try {
        const AuthStr = 'Bearer '.concat(token); 
        const res = await axios.get(`${url}/permission`, { headers: { Authorization: AuthStr } });
        await dispatch({
            type: PERMISSION,
            permission : res.data.permission,
            token: res.data.token
        })   
    } catch (err) {
        dispatch({
            type: ERROR,
            message: 'You are not registered',
            token,
        });
    }
};


export const changePassword = (data) => async dispatch => {
    try { 
        const res = await axios.post(`${url}/changepassword`, data);
        localStorage.removeItem('token');
        dispatch({
            type: CHANGE,
            message: res.data,
        });
    } catch (err) {
        dispatch({
            type: ERROR,
            message: 'you entered incorrect data'
        });
    }
};

export const recovery = (data) => async dispatch => {
    try { 
        const res = await axios.post(`${url}/recovery`, data);
        dispatch({
            type: RECOVERY,
            message: "Password send to your email",
        });
    } catch (err) {
        dispatch({
            type: ERROR,
            message: 'you entered incorrect data'
        });
    }
};
