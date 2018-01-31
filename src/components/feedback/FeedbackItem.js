/* Contains screenshot of deployed app, title, author, description, tech stack, buttons to provide feedback or view feedback. */
import React from 'react';

class FeedbackItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.item;
    return (
      <div id="feedback-item">
        <h2>{item.type} by {item.name}</h2>
        <p>{item.text}</p>
      </div>
    );
  }
}

export default FeedbackItem;
