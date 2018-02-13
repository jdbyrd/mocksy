import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import VerificationModal from '../shared/VerificationModal';
import EditModal from '../shared/EditModal';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

class AppsTabCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      component: 'project'
    };
  }

  render() {
    const project = this.props.project;
    let id = '';
    if (this.props.auth) {
      id = this.props.auth.id;
    }
    return (
      <Project className="users-projects">
          <Container>
            <ProjectImage
              src={`/images/${this.props.project.id}.png`}
              className="users-projects-image"
            />
            <TopRight className="top-right">
            { (this.props.auth && this.props.auth.username === this.props.name) ?
              <span>
                <VerificationModal
                  item={this.props}
                  component={this.state.component}
                />
                <EditModal
                  name={this.props.name}
                  text={project.text}
                  id={project.id}
                  component="project"
                />
              </span>
              : null
            }
            </TopRight>
          </Container>
        <Link to={`/project/${this.props.project.id}`}>
          <ProjectTitle>
            <h3>
              {project.title}
            </h3>
          </ProjectTitle>
          <ProjectDescription>
            {project.text}
          </ProjectDescription>
        </Link>

      </Project>
    );
  }
}

export default connect(mapStateToProps)(AppsTabCard);

const Project = styled.div`

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

const Container = styled.div`
  position: relative;
`;

const TopRight = styled.div`
  position: absolute;
  top: 8px;
  right: 16px;
`;
