/* Contains screenshot of deployed app, title, author, description, tech stack, buttons to provide feedback or view feedback. */
import React from 'react';
import Button from '../shared/button';

class FeedbackItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.feedback.type}
      </div>
    );
  }
}

export default FeedbackItem;
