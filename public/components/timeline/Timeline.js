/**
 * Timeline Component
 * @author ryan bian
 * @date 2018-08-27
 * @class Timeline
 * @extends {Component}
 */
import { Component, Fragment, createRef } from 'react';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Favorite, ThumbUp, MoreVert, Comment } from '@material-ui/icons';
import moment from 'moment';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader } from 'react-virtualized';
import PropTypes from 'prop-types';
import 'react-virtualized/styles.css';

const styles = theme => ({
  container: {
    height: '100%',
    overflow: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

const cache = new CellMeasurerCache({
  defaultHeight: 30,
  fixedWidth: true,
});

@withStyles(styles)
@observer
export default class Timeline extends Component {
  static propTypes = {
    posts: MobxPropTypes.observableArray,
    totalCount: PropTypes.number,
    getData: PropTypes.func,
  };
  rootNode = createRef();
  // list = createRef();
  componentDidMount() {
    this.props.getData(true);
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === this.rootNode.current) {
          this.handleContainerResize(entry.contentRect);
        }
      }
    });
    ro.observe(this.rootNode.current);
    this.containerWidth = this.rootNode.current.getBoundingClientRect().width;
  }
  handleContainerResize(rect) {
    if (this.containerWidth !== rect.width) {
      this.clearTimer && clearTimeout(this.clearTimer);
      this.clearTimer = setTimeout(() => {
        cache.clearAll();
        this.containerWidth = rect.width;
        // this.list.current.recomputeRowHeights();
      }, 200);
    }
  }
  loadMoreRows = async ({ startIndex, stopIndex }) => {
    const { getData } = this.props;
    await getData(false, stopIndex - startIndex + 1);
    return true;
  }
  isRowLoaded = ({ index }) => {
    const { posts } = this.props;
    return !!posts[index] && (index <= posts.length - 1);
  }
  renderPost = ({ key, index, parent, style }) => {
    const post = this.props.posts[index];
    const { classes } = this.props;
    let content;
    if (!post) {
      content = (
        <CardContent>
          <Typography>pending</Typography>
        </CardContent>
      );
    } else {
      content = (
        <Fragment>
          <CardHeader
            avatar={
              <Avatar src={post.user.avatar_large} />
            }
            action={
              <IconButton>
                <MoreVert />
              </IconButton>
            }
            title={post.user.screen_name}
            subheader={
              <Fragment>
                <span>{moment(post.created_at).toNow()}</span>
                <span dangerouslySetInnerHTML={{__html: post.source}} />
              </Fragment>
            }
          />
          <CardContent>
            <Typography>{ post.text }</Typography>
            {
              post.pic_urls &&
              post.pic_urls.map(pic => (
                <img key={pic.thumbnail_pic} src={pic.thumbnail_pic} alt="" />
              ))
            }
          </CardContent>
          <CardActions>
            <IconButton aria-label="favorite">
              <Favorite />
            </IconButton>
            <IconButton aria-label="praise">
              <ThumbUp />
            </IconButton>
            <IconButton aria-label="comment">
              <Comment />
            </IconButton>
          </CardActions>
        </Fragment>
      );
    }
    return (
      <CellMeasurer
        cache={cache}
        key={key}
        columnIndex={0}
        rowIndex={index}
        parent={parent}
      >
        <Card
          style={style}
        >{content}</Card>
      </CellMeasurer>
    );
  }
  render() {
    const { classes, totalCount } = this.props;
    return (
      <div
        ref={this.rootNode}
        className={classes.container}
      >
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={totalCount}
          minimumBatchSize={20}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ width, height }) => (
                <List
                  ref={registerChild}
                  width={width}
                  height={height}
                  rowCount={totalCount}
                  rowHeight={cache.rowHeight}
                  rowRenderer={this.renderPost}
                  onRowsRendered={onRowsRendered}
                  deferredMeasurementCache={cache}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    );
  }
}
