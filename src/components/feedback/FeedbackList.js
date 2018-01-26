/* List of all feedback the app has received. Contains <FeedbackItem>s. */
/* Button for 'Post feedback' and dropdown menu for sorting criteria at top of list. */
import React from 'react';
import { connect } from 'react-redux';
import FeedbackItem from './FeedbackItem';

const mapStateToProps = (state) => {
  return {
    feedbackItems: state.feedbackItems
  };
};

class FeedPage extends React.Component {
  render() {
    return (
      <div>
        {this.props.feedback.map((item, index) => <FeedbackItem key={index} item={feedbackItems} />)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedPage);
