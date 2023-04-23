import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/App.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);

