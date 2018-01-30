/* A smaller version of the <AppCard> that fits within the <AppsTab> component of the <UserProfilePage>. */
import React from 'react';
import styled, { css } from 'styled-components';
import Button from '../shared/button';

class AppsTabCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const project = this.props.project;
    return (
      <Project>
        <ProjectImage src={project.image} />
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.text}</ProjectDescription>
      </Project>
    );
  }
}

export default AppsTabCard;

const Project = styled.div`
  margin: auto;
  width: 400px;
  height: 300px;
`;

const ProjectImage = styled.img`
  border: 1px solid black;
  margin: auto;
  width: 400px;
  height: 200px;
`;

const ProjectTitle = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
`;

const ProjectDescription = styled.div`
  text-align: center;
`;
