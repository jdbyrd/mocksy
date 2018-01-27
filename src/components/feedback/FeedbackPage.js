/* Feedback page for selected app. */
/* Consists of <AppSidebar>, <FeedbackList>, and <PostFeedbackModal>. */
import React from 'react';
import { connect } from 'react-redux';
import AppSidebar from './AppSidebar';
import FeedbackList from './FeedbackList';
import { populateFeedback } from '../../actions/index';


class FeedbackPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    populateFeedback(this.props.match.params.id);
  }

  componentWillReceiveProps(nextprops){
    populateFeedback(nextprops.match.params.id);
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

export default FeedbackPage;
