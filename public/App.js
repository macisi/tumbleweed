import { hot } from 'react-hot-loader';
import { Fragment } from 'react';
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

const source = createMemorySource('/');
const history = createHistory(source);

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 12,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Fragment>
      <CssBaseline />
      <LocationProvider history={history}>
        <SideBar />
        <Authorization>
          <Router className="content">
            <Dashboard path="/" />
            <UserPage path="/user/:uid" />
          </Router>
        </Authorization>
      </LocationProvider>
    </Fragment>
  </MuiThemeProvider>
);

export default hot(module)(App);
