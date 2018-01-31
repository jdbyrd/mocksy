/* Essentially a <FeedbackItem> but with a screenshot and link of the reviewed app. */
import React from 'react';
import Button from '../shared/button';

class FeedbackTabCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const project = this.props.data.project;
    const feedback = this.props.data.feedback;
    return (
      <div>
        FEEDBACK HERE
      </div>
    );
  }
}

export default FeedbackTabCard;
