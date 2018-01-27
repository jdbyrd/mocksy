/* Header with Github photo, name, bio, and Github link. */
import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => (
  {
    user: state.user.profile
  }
);

class UserHeader extends React.Component {
  render() {
    return (
      <div>
        USER PROFILE HERE
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserHeader);
