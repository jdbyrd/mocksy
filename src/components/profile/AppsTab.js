/* Tab that renders that user's uploaded apps. */
import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import AppsTabCard from './AppsTabCard';
import AddAppModal from './AddAppModal';

const mapStateToProps = state => (
  {
    projects: state.user.projects,
    auth: state.auth
  }
);

class AppsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  render() {
    return (
      <ProjectsContainer>
        {(this.props.auth && this.props.auth.username === this.props.name)?
          <AddAppModal />
          :null
        }
        {this.props.projects.map((project, index) => (
          <Container key={index} className="user-projects-container"><AppsTabCard project={project} /></Container>
        ))}
      </ProjectsContainer>
    );
  }
}

export default connect(mapStateToProps)(AppsTab);

const ProjectsContainer = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 33%;
  height: 300px;
  display: inline-block;
  margin-top: 15px;
`;
