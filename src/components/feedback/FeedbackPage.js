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

  render() {
    return (
      <div>
        <AppSidebar />
        <FeedbackList />
      </div>
    );
  }
}

export default FeedPage;
