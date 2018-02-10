import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import EditModal from '../shared/EditModal';
import VerificationModal from '../shared/VerificationModal';

class FeedbackTabCard extends React.Component {
  render() {
    const project = this.props.data.project;
    const feedback = this.props.data.feedback;
    const user = this.props.user;
    const item = this.props;
    console.log(this.props.user)
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
          <Col span={10}>
            <p>{feedback.text}</p>
          </Col>
          <Col span={2}>
            <EditModal
              name={this.props.name}
              text={feedback.text}
              id={feedback.id}
              project_id={project.id}
              parent="userPage"
              component="feedback"
            />
            <VerificationModal
              item={feedback}
              user={user}
              component="feedbackTab"
            />
          </Col>
          <Col span={2} />
        </Row>
      </div>
    );
  }
}

export default FeedbackTabCard;
