import axios from 'axios';
import { AUTH, ERROR, USERS } from './types';

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
        message
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
            message: 'You entered incorrect data'
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
            token : token
        })   
    } catch (err) {
        dispatch({
            type: ERROR,
            message: 'you dont can to get users'
        });
    }
};
