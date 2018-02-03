import React from 'react';
import { Row, Col } from 'antd';

class FeedbackTabCard extends React.Component {

  render() {
    const project = this.props.data.project;
    const feedback = this.props.data.feedback;
    return (
      <div>
        <div id="tab-padding" />
        <Row gutter={48}>
          <Col span={2} />
            <Col span={8}>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
            </Col>
          <Col span={12}>
            <p>{feedback.text}</p>
          </Col>
          <Col span={2} />
        </Row>
      </div>
    );
  }
}

export default FeedbackTabCard;
