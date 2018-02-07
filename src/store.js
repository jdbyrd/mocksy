import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reducer from './reducers/index';

const store = createStore(reducer, applyMiddleware(logger));
//const store = createStore(reducer);

export default store;
