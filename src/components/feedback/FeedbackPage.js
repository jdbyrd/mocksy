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

    this.state = {
      showFeedbackModal: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    populateFeedback(this.props.match.params.id);
  }

  componentWillReceiveProps(nextprops){
    populateFeedback(nextprops.match.params.id);
  }

  handleClick(e) {
    this.setState({showFeedbackModal: true})
  }

  render() {
    return (
      <div>
        <AppSidebar />
        <FeedbackList />
        <button 
          onClick={this.handleClick}
        >Open modal
        </button>
      </div>
    );
  }
}

export default FeedbackPage;
