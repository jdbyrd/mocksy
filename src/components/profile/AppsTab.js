/* Tab that renders that user's uploaded apps. */
import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import AppsTabCard from './AppsTabCard';
import AddAppModal from './AddAppModal';

const mapStateToProps = state => (
  {
    projects: state.user.projects
  }
);

class AppsTab extends React.Component {
  render() {
    return (
      <div>
        <Row gutter={48}>
          <Col span={2} />
          <Col span={16} >
            <AddAppModal />
            {this.props.projects.map((project, index) => <AppsTabCard key={index} project={project} />)}
          </Col>
          <Col span={2} />
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppsTab);
