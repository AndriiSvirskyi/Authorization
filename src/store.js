import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/index';

const middlewares = [];

if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({
        collapsed: true,
        duration: true,
    });

    middlewares.push(logger);
}

const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares),
);

export default store;
