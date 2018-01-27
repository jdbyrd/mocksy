/* Contains screenshot of deployed app, title, author, description, tech stack, buttons to provide feedback or view feedback. */
import React from 'react';
import Button from '../shared/button';

class FeedbackItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.item;
    return (
      <div>
        {item.text}
        {item.user}
      </div>
    );
  }
}

export default FeedbackItem;
