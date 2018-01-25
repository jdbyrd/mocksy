import React from 'react';
import ReactDOM from 'react-dom';
import store from './store.js';
import { Provider } from 'react-redux';

class App extends React.Component {}

ReactDOM.render((
  <Provider store = {store}>
    <App />
  </Provider>
), document.getElementById('app'));