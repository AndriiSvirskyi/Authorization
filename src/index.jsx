import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './support';
import { App } from './app';

import { configureFakeBackend } from './support';
configureFakeBackend();

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));