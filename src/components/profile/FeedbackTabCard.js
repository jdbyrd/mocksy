import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import EditModal from '../shared/EditModal';
import VerificationModal from '../shared/VerificationModal';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

class FeedbackTabCard extends React.Component {
  render() {
    const project = this.props.data.project;
    const feedback = this.props.data.feedback;
    const user = this.props.user;
    const item = this.props;
    console.log(this.props);
    return (
      <div>
        <div id="tab-padding" />
        <Row gutter={48}>
          <Col span={2} />
          <Col span={8}>
            <Link to={`/project/${project.id}`}>
              <img src={`/images/apps/thumbnails/${project.id}.png`} className="feedback-img" />
              <br /><br />
              <h3>{project.title}</h3>
              <p>{project.text}</p>
            </Link>
          </Col>
          <Col span={10}>
            <p>{feedback.text}</p>
          </Col>
          <Col span={2}>
          { item.name === item.auth.username ?
            <Col>
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
                project={project}
                component="feedbackTab"
              />
            </Col>
            : null
          }
          </Col>
          <Col span={2} />
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackTabCard);
