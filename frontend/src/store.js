import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';


const middlewares = [thunk, createLogger()];

const store = createStore(
  rootReducer,
  {
    auth: {
      token: localStorage.getItem('token')
    }
  },
  applyMiddleware(...middlewares)
);

export default store;
