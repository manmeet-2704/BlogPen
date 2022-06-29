import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
