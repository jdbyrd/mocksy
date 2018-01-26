/* Feedback page for selected app. */
/* Consists of <AppSidebar>, <FeedbackList>, and <PostFeedbackModal>. */
import React from 'react';
import { connect } from 'react-redux';
import AppSidebar from './AppSidebar';
import FeedbackList from './FeedbackList';

class FeedbackPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <FeedbackList />
      </div>
    );
  }
}

export default FeedbackPage;
