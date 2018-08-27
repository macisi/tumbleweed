import { hot } from 'react-hot-loader';
import { Fragment } from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { enableLogging } from 'mobx-logger';
import {
  createMemorySource,
  createHistory,
  LocationProvider,
  Router
} from '@reach/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

import './index.css';

import Authorization from './modules/authorization/';
import UserPage from './modules/user.page/';
import Dashboard from './modules/dashboard/';
import SideBar from './modules/sidebar/';

import oauth from './stores/oauth';
import { currentUser } from './stores/user';
import { myTimeline } from './stores/timeline';

configure({
  //  严格模式
  enforceActions: 'strict',
});

enableLogging();

const store = {
  oauth,
  currentUser,
  myTimeline,
};

const source = createMemorySource('/');
const history = createHistory(source);

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 12,
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Fragment>
        <CssBaseline />
        <Provider {...store}>
          <LocationProvider history={history}>
            <SideBar />
            <Authorization>
              <Router>
                <Dashboard path="/" />
                <UserPage path="/user/:uid" />
              </Router>
              <DevTools />
            </Authorization>
          </LocationProvider>
        </Provider>
      </Fragment>
    </MuiThemeProvider>
  );
};

export default hot(module)(App);
