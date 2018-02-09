import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import EditModal from '../shared/EditModal';

class FeedbackTabCard extends React.Component {
  render() {
    const project = this.props.data.project;
    const feedback = this.props.data.feedback;
    const item = this.props;
    return (
      <div>
        <div id="tab-padding" />
        <Row gutter={48}>
          <Col span={2} />
          <Col span={8}>
            <Link to={`/project/${project.id}`}>
              <img src={`/images/${project.id}.png`} className="feedback-img" />
              <br /><br />
              <h3>{project.title}</h3>
              <p>{project.text}</p>
            </Link>
          </Col>
          <Col span={11}>
            <p>{feedback.text}</p>
          </Col>
          <Col span={1}>
            <EditModal
              name={this.props.name}
              text={feedback.text}
              id={feedback.id}
              project_id={project.id}
              parent="userPage"
              component="feedback"
            />
          </Col>
          <Col span={2} />
        </Row>
      </div>
    );
  }
}

export default FeedbackTabCard;
