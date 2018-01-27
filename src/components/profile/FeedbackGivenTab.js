/* Tab with dynamically rendered list of apps reviewed by that user. Contains <FeedbackCard>. */
import React from 'react';
import { connect } from 'react-redux';
import AppsTabCard from './AppsTabCard';

const mapStateToProps = state => (
  {
    feedback: state.user.feedback
  }
);

class FeedbackList extends React.Component {
  render() {
    return (
      <div>
        {this.props.feedback.map((project, index) => <AppsTabCard key={index} project={project} />)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackList);
