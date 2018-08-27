/**
 * Timeline Component
 * @author ryan bian
 * @date 2018-08-27
 * @class Timeline
 * @extends {Component}
 */
import { Component } from 'react';
import { observer, PropTypes } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {};

@withStyles(styles)
@observer
export default class Timeline extends Component {
  static propTypes = {
    posts: PropTypes.observableArray,
  };
  renderPost(post) {
    return (
      <Card key={post.id}>
        <CardContent>{ post.text }</CardContent>
      </Card>
    );
  }
  render() {
    console.log(this.props.posts);
    const { posts } = this.props;
    return (
      <div>
        { posts.map(this.renderPost) }
      </div>
    );
  }
}
