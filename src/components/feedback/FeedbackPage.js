/* Feedback page for selected app. */
/* Consists of <AppSidebar>, <FeedbackList>, and <PostFeedbackModal>. */

import React from 'react';

class FeedbackPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFeedbackModal: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({showFeedbackModal: true})
  }

  render() {
    return (
      <div>
        <Button 
          onClick={this.handleClick}
        >Open modal
        </Button>
      </div>
    );
  }
}