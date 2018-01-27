/* User page with header, apps tab, and feedback given tab. */
import React from 'react';
import { connect } from 'react-redux';
import UserHeader from './UserHeader';
import AppsTab from './AppsTab';
import { populateUser } from '../../actions/index';


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    populateUser(this.props.match.params.id);
  }

  componentWillReceiveProps(nextprops){
    populateUser(nextprops.match.params.id);
  }

  render() {
    return (
      <div>
        <UserHeader />
        <AppsTab />
      </div>
    );
  }
}

export default ProfilePage;
