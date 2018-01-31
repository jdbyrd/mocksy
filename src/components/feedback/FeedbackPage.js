import React from 'react';
import { Row, Col, Select } from 'antd';
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
            <PostFeedbackModal id={this.props.match.params.id} />
            <Select
              style={{ width: 200 }}
              placeholder="Sort by"
              onChange={this.handleSort}
            >
              <Select.Option value="most upvoted">Most upvoted</Select.Option>
              <Select.Option value="most downvoted">Most downvoted</Select.Option>
              <Select.Option value="most controversial">Most controversial</Select.Option>
            </Select>
            <br /><br /><br />
            <FeedbackList />
          </Col>
          <Col span={2} />
        </Row>
      </div>
    );
  }
}

export default FeedbackPage;

