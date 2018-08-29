import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './reducer';

const enhancer = applyMiddleware(promiseMiddleware);

export default createStore(reducer, enhancer);
