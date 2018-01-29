import React from 'react';
import { populateFeedback } from '../../actions/index';

import AppSidebar from './AppSidebar';
import FeedbackList from './FeedbackList';
import PostFeedbackModal from './PostFeedbackModal';

class FeedbackPage extends React.Component {
  componentDidMount() {
    populateFeedback(this.props.match.params.id);
  }

  componentWillReceiveProps(nextprops) {
    populateFeedback(nextprops.match.params.id);
  }

  render() {
    return (
      <div>
        <AppSidebar />
        <FeedbackList />
        <PostFeedbackModal />
      </div>
    );
  }
}

export default FeedbackPage;

