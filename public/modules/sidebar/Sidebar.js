/**
 * Sidebar Component
 * @author ryan bian
 * @date 2018-08-27
 * @export SideBar
 * @class SideBar
 * @extends {Component}
 */
import { Component } from 'react';
import { Link } from '@reach/router';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Dialog from '@material-ui/core/Dialog';
import { Person, Timeline, InfoOutlined, PowerOff } from '@material-ui/icons';

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
  button: {
    color: theme.palette.primary.contrastText,
  },
});

@withStyles(styles)
export default class SideBar extends Component {
  static propTypes = {
  }
  showApiLimits = async () => {
  }
  handleLogout = async () => {
  }
  render() {
    const { classes } = this.props;
    const parts = [];
    // if (oauth.accessToken) {
    //   parts.push(
    //     <IconButton
    //       key={'limit'}
    //       onClick={this.showApiLimits}
    //       classes={{ root: classes.button }}
    //     >
    //       <InfoOutlined />
    //     </IconButton>,
    //     <IconButton
    //       key={'logout'}
    //       onClick={this.handleLogout}
    //       classes={{ root: classes.button }}
    //     >
    //       <PowerOff />
    //     </IconButton>
    //   );
    // }
    return (
      <aside className={classes.aside}>
        <Link to="/user">
          {
            // userInfo.id ?
            //   <Avatar src={userInfo.profile_image_url} alt="" /> :
          }
          <Avatar><Person /></Avatar>
        </Link>
        <Link className={classes.link} to="/">
          <Timeline />
        </Link>
        { parts }
      </aside>
    );
  }
}
