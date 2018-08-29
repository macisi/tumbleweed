import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import DevTool from './DevTool';
import store from './configureStore';

ReactDOM.render(
  <Provider store={store}>
    <Fragment>
      <App />
      <DevTool />
    </Fragment>
  </Provider>,
  document.querySelector('#App')
);

