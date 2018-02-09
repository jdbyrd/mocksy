/* Tab with dynamically rendered list of apps reviewed by that user. Contains <FeedbackCard>. */
import React from 'react';
import { connect } from 'react-redux';
import FeedbackTabCard from './FeedbackTabCard';

const mapStateToProps = state => (
  {
    feedback: state.user.feedbackList
  }
);

class FeedbackList extends React.Component { 
  render() {
    return (
      <div>
        {this.props.feedback.map((project, index) => 
          <FeedbackTabCard 
            key={index} 
            data={project} 
            name={this.props.name}
          />)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackList);
