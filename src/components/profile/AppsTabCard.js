/* A smaller version of the <AppCard> that fits within the <AppsTab> component of the <UserProfilePage>. */
import React from 'react';
import Button from '../shared/button';

class AppsTabCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const project = this.props.project;
    return (
      <div>
        PROJECT HERE
      </div>
    );
  }
}

export default AppsTabCard;
