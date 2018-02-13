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
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.filterByFeedbackType = this.filterByFeedbackType.bind(this);
  }

  filterByFeedbackType(item) {
    if (this.props.type.type === item.options || this.props.type === 'all') {
      return <FeedbackItem key={item.id} item={item} />;
    }
    return null;
  }

  render() {
    const { feedbackItems } = this.props;
    return (
      <div className="feedback-list">
        {feedbackItems.map(item => this.filterByFeedbackType(item))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackList);
