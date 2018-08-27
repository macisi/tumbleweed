/**
 * Dashboard Component
 * @author ryan bian
 * @date 2018-08-27
 * @export
 * @class
 * @extends {Component}
 */
import { Component } from 'react';
import { inject, observer, PropTypes } from 'mobx-react';

import Timeline from '../../components/timeline/';

@inject('currentUser', 'myTimeline')
@observer
export default class Dashboard extends Component {
  static propTypes = {
    currentUser: PropTypes.observableObject,
    myTimeline: PropTypes.observableObject,
  }
  componentDidMount() {
    this.props.myTimeline.getPosts();
  }
  render() {
    return <Timeline posts={this.props.myTimeline.posts} />;
  }
}
