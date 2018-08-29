import { isImmutable } from 'immutable';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './reducer';
import DevTool from './DevTool';

const logger = createLogger({
  level: 'info',
  stateTransformer: state => {
    if (isImmutable(state)) return state.toJS();
    const output = {};
    Object.keys(state).forEach(key => {
      if (isImmutable(state[key])) {
        Object.assign(output, {
          [key]: state[key].toJS(),
        });
      } else {
        Object.assign(output, {
          [key]: state[key],
        });
      }
    });
    return output;
  },
});

const monitorReducer = (state = {}) => state;

const enhancer = compose(
  applyMiddleware(
    promiseMiddleware,
    logger,
  ),
  DevTool.instrument(monitorReducer, {
    maxAge: 50,
    shouldCatchErrors: true,
  })
);

export default createStore(reducer, enhancer);

