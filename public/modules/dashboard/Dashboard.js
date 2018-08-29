/**
 * Dashboard Component
 * @author ryan bian
 * @date 2018-08-27
 * @export
 * @class
 * @extends {Component}
 */
import { Component } from 'react';

import Timeline from '../../components/timeline/';

export default class Dashboard extends Component {
  static propTypes = {
  }
  render() {
    return (
      <Timeline
        posts={this.props.myTimeline.posts}
        totalCount={this.props.myTimeline.totalCount}
        getData={this.props.myTimeline.getPosts}
      />
    );
  }
}
