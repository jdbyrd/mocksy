/* Contains screenshot of deployed app, title, author, description, tech stack, buttons to provide feedback or view feedback. */
import React from 'react';
import Button from '../shared/button';

class AppCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.project.title}
      </div>
    );
  }
}

export default AppCard;
