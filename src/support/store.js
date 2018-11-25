import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import registration from '../reducers';

const loggerMiddleware = createLogger();

export const store = createStore(
    registration,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);