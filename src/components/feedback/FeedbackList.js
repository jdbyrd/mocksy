/* List of all feedback the app has received. Contains <FeedbackItem>s. */
/* Button for 'Post feedback' and dropdown menu for sorting criteria at top of list. */
import React from 'react';
import { connect } from 'react-redux';
import FeedbackItem from './FeedbackItem';

const mapStateToProps = state => (
  {
    feedbackItems: state.feedback.list
  }
);

class FeedbackList extends React.Component {
  render() {
    const feedbackItems = this.props.feedbackItems;
    return (
      <div className="feedback-list">
        {feedbackItems.map((item, index) =>
          <FeedbackItem key={index} item={item} />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackList);
