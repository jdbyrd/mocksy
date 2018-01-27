/* User page with header, apps tab, and feedback given tab. */
import React from 'react';
import { connect } from 'react-redux';
import UserHeader from './UserHeader';
import AppsTab from './AppsTab';
import FeedbackGivenTab from './FeedbackGivenTab';
import { populateUser } from '../../actions/index';


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    populateUser(this.props.match.params.name);
  }

  componentWillReceiveProps(nextprops){
    populateUser(nextprops.match.params.name);
  }

  render() {
    return (
      <div>
        <UserHeader />
        <AppsTab />
        <FeedbackGivenTab />
      </div>
    );
  }
}

export default ProfilePage;
