/* Tab that renders that user's uploaded apps. */
import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import AppsTabCard from './AppsTabCard';
import AddAppModal from './AddAppModal';

const mapStateToProps = state => (
  {
    projects: state.user.projects
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
        {this.state.showModal ?
          <AddAppModal />
        :
          <AddProjectContainer>
            <AddProjectButton>+</AddProjectButton>
            <Instructions>Add a project</Instructions>
          </AddProjectContainer>
        }
        {this.props.projects.map((project, index) => (
          <Container key={index}><AppsTabCard project={project} /></Container>
        ))}
      </ProjectsContainer>
    );
  }
}

export default connect(mapStateToProps)(AppsTab);

const ProjectsContainer = styled.div`
  width: 100%;
`;

const AddProjectContainer = styled.div`
  width: 33%;
  height: 278px;
  display: inline-block;
`;

const Container = styled.div`
  width: 33%;
  height: 300px;
  display: inline-block;
  margin-top: 15px;
`;

const Instructions = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
`;

const AddProjectButton = styled.div`
  width: 400px;
  text-align: center;
  height: 200px;
  border: 1px solid black;
  line-height: 200px;
  font-size: 35px;
  margin: auto;
`;