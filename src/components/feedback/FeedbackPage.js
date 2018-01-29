import React from 'react';
// import styled, { css } from 'styled-components';
import { Button } from 'antd';
import { connect } from 'react-redux';
import AppSidebar from './AppSidebar';
import FeedbackList from './FeedbackList';
import PostFeedbackModal from './PostFeedbackModal';
import { populateFeedback } from '../../actions/index';

class FeedbackPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleFeedbackModal: false
    }

    this.showFeedbackModal = this.showFeedbackModal.bind(this);
  }

  componentDidMount() {
    populateFeedback(this.props.match.params.id);
  }

  componentWillReceiveProps(nextprops){
    populateFeedback(nextprops.match.params.id);
  }

  showFeedbackModal() {
    this.setState({toggleFeedbackModal: true});
    console.log('triggered showfeedbackmodal')
  }

  render() {
    return (
      <div>
        <AppSidebar />
        <FeedbackList />
        <Button type="primary" onClick={this.showFeedbackModal}>Post feedback</Button>
      
        <PostFeedbackModal />

      </div>
    );
  }
}

export default FeedbackPage;


