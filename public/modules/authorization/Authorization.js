/**
 * authorize validation
 * @author ryan bian
 * @date 2018-08-27
 * @export Authorization
 * @extends {Component}
 */
import { ipcRenderer } from 'electron';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { GET_ACCESS_TOKEN } from '../../../share/IPC_COMMANDS';

import { actions } from './store';

const styles = theme => ({
  main: {
    width: `calc(100% - ${40 + theme.spacing.unit * 2}px)`,
  },
});

@withStyles(styles)
class Authorization extends PureComponent {
  static propTypes = {
    login: PropTypes.bool,
    doLogin: PropTypes.func,
    loginIn: PropTypes.func,
  }
  componentDidMount() {
    ipcRenderer.on(GET_ACCESS_TOKEN, this.getAccessToken);
  }
  componentWillUnmount() {
    ipcRenderer.removeListener(GET_ACCESS_TOKEN, this.getAccessToken);
  }
  getAccessToken = (event, data) => {
    this.props.loginIn(data);
  }
  handleLogin = () => {
    this.props.doLogin();
  }
  renderLoginPane() {
    const props = {
      variant: 'contained',
      color: 'primary',
      onClick: this.handleLogin,
    };
    return <Button {...props}>登陆</Button>;
  }
  renderContent() {
    return this.props.children;
  }
  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <main className={classes.main}>
        {
          // this.renderContent()
          this.renderLoginPane()
        }
      </main>
    );
  }
}

const mapStateToProps = state => ({
  login: state.auth.get('login'),
  pending: state.auth.get('pending'),
});
const mapDispatchToProps = dispatch => ({
  doLogin: () => dispatch(actions.requestLogin()),
  loginIn: data => dispatch(actions.loginIn(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Authorization);
