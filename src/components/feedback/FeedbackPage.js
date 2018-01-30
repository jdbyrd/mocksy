import React from 'react';
import { Row, Col } from 'antd';
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
        <Row gutter={48}>
          <Col span={2} />
          <Col span={8}><AppSidebar /></Col>
          <Col span={12}>
            <PostFeedbackModal /><br /><br /><br />
            <FeedbackList />
          </Col>
          <Col span={2} />
        </Row>
      </div>
    );
  }
}

export default FeedbackPage;

