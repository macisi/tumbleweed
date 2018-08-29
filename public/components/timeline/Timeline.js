/**
 * Timeline Component
 * @author ryan bian
 * @date 2018-08-27
 * @class Timeline
 * @extends {Component}
 */
import { Component, Fragment, createRef } from 'react';
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

@withStyles(styles)
export default class Timeline extends Component {
  static propTypes = {
    totalCount: PropTypes.number,
    getData: PropTypes.func,
  };
  rootNode = createRef();
  list = createRef();
  measureCache = new CellMeasurerCache({
    defaultHeight: 30,
    fixedWidth: true,
  });
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
        this.measureCache.clearAll();
        this.containerWidth = rect.width;
        this.list.recomputeRowHeights();
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
    return (index <= posts.length - 1) && !!posts[index];
  }
  renderPost = ({ key, index, parent, style }) => {
    let content;
    if (index >= this.props.posts.length) {
      content = (
        <Card
          key={key}
          style={style}
        >
          <CardContent>
            <Typography>pending</Typography>
          </CardContent>
        </Card>
      );
    } else {
      const post = this.props.posts[index];
      content = (
        <CellMeasurer
          cache={this.measureCache}
          key={key}
          columnIndex={0}
          rowIndex={index}
          parent={parent}
        >
          <Card style={style}>
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
          </Card>
        </CellMeasurer>
      );
    }
    return content;
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
                  ref={ref => {
                    this.list = ref;
                    registerChild(ref);
                  }}
                  width={width}
                  height={height}
                  rowCount={totalCount}
                  rowHeight={this.measureCache.rowHeight}
                  rowRenderer={this.renderPost}
                  onRowsRendered={onRowsRendered}
                  deferredMeasurementCache={this.measureCache}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    );
  }
}
