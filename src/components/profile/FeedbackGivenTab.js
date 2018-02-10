/* Tab with dynamically rendered list of apps reviewed by that user. Contains <FeedbackCard>. */
import React from 'react';
import { connect } from 'react-redux';
import FeedbackTabCard from './FeedbackTabCard';

const mapStateToProps = state => (
  {
    feedback: state.user.feedbackList,
    user: state.user.user
  }
);

class FeedbackList extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.feedback.map((project, index) =>
          <FeedbackTabCard
            key={index}
            data={project}
            name={this.props.name}
            user={this.props.user}
          />)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackList);
