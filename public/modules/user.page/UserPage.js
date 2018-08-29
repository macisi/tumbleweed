/**
 * User Page Component
 * @author ryan bian
 * @date 2018-08-27
 * @export
 */
import { Component } from 'react';

export default class UserPage extends Component {
  static propTypes = {
  }
  render() {
    const { userInfo } = this.props.currentUser;
    return (
      <div>
        <img src={userInfo.profile_image_url} alt="" />
        {userInfo.screen_name}
        <p>{userInfo.location}</p>
        <p>{userInfo.description}</p>
        <p>{userInfo.gender}</p>
      </div>
    );
  }
}
