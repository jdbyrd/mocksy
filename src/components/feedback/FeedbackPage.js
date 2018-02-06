import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Select } from 'antd';
import { populateFeedback } from '../../actions/index';

import AppSidebar from './AppSidebar';
import FeedbackList from './FeedbackList';
import PostFeedbackModal from './PostFeedbackModal';
import LoginModal from '../login/LoginModal';

const mapStateToProps = state => (
  {
    project: state.feedback.project,
    auth: state.auth
  }
);

class FeedbackPage extends React.Component {
  componentDidMount() {
    populateFeedback(this.props.match.params.id);
    this.props.isHomepage(false);
  }

  render() {
    const project = this.props.project;
    return (
      <div>
        <div id="feedback-padding"></div>
        <Row>
          <Col span={2} />
          <Col span={22}>
            <h1>Feedback for {project.title}</h1>
          </Col>
        </Row>
        <Row gutter={48}>
          <Col span={2} />
          <Col span={8}><AppSidebar /></Col>
          <Col span={12}>
            { this.props.auth ?
              <PostFeedbackModal id={this.props.match.params.id} /> :
              <LoginModal />
            }
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

export default connect(mapStateToProps)(FeedbackPage);
