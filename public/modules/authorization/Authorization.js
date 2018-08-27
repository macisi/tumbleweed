/**
 * authorize validation
 * @author ryan bian
 * @date 2018-08-27
 * @export Authorization
 * @extends {Component}
 */
import { Component } from 'react';
import { inject, observer, PropTypes } from 'mobx-react';

@inject('oauth')
@observer
export default class Authorization extends Component {
  static propTypes = {
    oauth: PropTypes.observableObject,
  }
  handleLogin = () => {
    this.props.oauth.login();
  }
  validate() {
    // TODO: validate the accessToken
  }
  renderLoginPane() {
    return <button onClick={this.handleLogin}>登陆</button>;
  }
  renderContent() {
    return this.props.children;
  }
  render() {
    const { oauth } = this.props;
    return (
      <main>
        {
          oauth.accessToken ?
            this.renderContent() :
            this.renderLoginPane()
        }
      </main>
    );
  }
}
