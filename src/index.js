import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import { Provider } from 'react-redux';
import {store} from "./redux/store";

import './assets/scss/App.scss';

ReactDOM.render(
  <Provider store = {store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);

