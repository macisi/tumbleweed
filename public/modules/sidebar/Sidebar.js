/**
 * Sidebar Component
 * @author ryan bian
 * @date 2018-08-27
 * @export SideBar
 * @class SideBar
 * @extends {Component}
 */
import { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import { Link } from '@reach/router';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Timeline } from '@material-ui/icons';

const styles = theme => ({
  aside: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    alignItems: 'center',
  },
  link: {
    color: theme.palette.primary.contrastText,
  },
});

@withStyles(styles)
@inject('currentUser')
@observer
export default class SideBar extends Component {
  static propTypes = {
    currentUser: PropTypes.observableObject,
  }
  render() {
    const { classes } = this.props;
    const { userInfo } = this.props.currentUser;
    return (
      <aside className={classes.aside}>
        <Link to="/user">
          <Avatar src={userInfo.profile_image_url} alt="" />
        </Link>
        <Link className={classes.link} to="/">
          <Timeline />
        </Link>
      </aside>
    );
  }
}
