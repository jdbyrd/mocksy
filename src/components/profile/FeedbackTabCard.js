/* Essentially a <FeedbackItem> but with a screenshot and link of the reviewed app. */
import React from 'react';
import Button from '../shared/button';

class FeedbackTabCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const feedback = this.props.feedback;
    return (
      <div>
        FEEDBACK HERE
      </div>
    );
  }
}

export default FeedbackTabCard;
