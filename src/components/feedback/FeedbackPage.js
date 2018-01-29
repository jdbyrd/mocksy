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
  }

  componentDidMount() {
    populateFeedback(this.props.match.params.id);
  }

  componentWillReceiveProps(nextprops){
    populateFeedback(nextprops.match.params.id);
  }

  ////////////// MODAL FUNCTIONS /////////////
  

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


