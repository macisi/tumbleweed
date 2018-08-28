/**
 * Timeline Component
 * @author ryan bian
 * @date 2018-08-27
 * @class Timeline
 * @extends {Component}
 */
import { Component, Fragment } from 'react';
import { observer, PropTypes } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Favorite, ThumbUp } from '@material-ui/icons';

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

@withStyles(styles)
@observer
export default class Timeline extends Component {
  static propTypes = {
    posts: PropTypes.observableArray,
  };
  renderPost = post => {
    const { classes } = this.props;
    return (
      <Card key={post.id}>
        <CardHeader
          avatar={
            <Avatar src={post.user.avatar_large} />
          }
          title={post.user.screen_name}
          subheader={
            <Fragment>
              <span>{post.created_at}</span>
              <span dangerouslySetInnerHTML={{__html: post.source}} />
            </Fragment>
          }
        />
        { post.thumbnail_pic &&
          <CardMedia
            className={classes.media}
            image={post.thumbnail_pic}
          />
        }
        <CardContent>
          <Typography paragraph>{ post.text }</Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="favorite">
            <Favorite />
          </IconButton>
          <IconButton aria-label="praise">
            <ThumbUp />
          </IconButton>
        </CardActions>
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
