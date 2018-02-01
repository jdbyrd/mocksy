import React from 'react';
import { Link } from 'react-router-dom';

class FeedbackItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.item;
    return (
      <div id="feedback-item">
        <h2>{item.options} by
          <Link to={`/user/${item.name}`}>
            &nbsp;{item.display_name}
          </Link>
        </h2>
        <p>{item.text}</p>
      </div>
    );
  }
}

export default FeedbackItem;
