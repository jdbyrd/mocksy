import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '../shared/button';
import { populateUser } from '../../actions/index';
import { Icon } from 'antd';
import VerificationModal from '../shared/VerificationModal';


const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

class AppsTabCard extends React.Component {
  constructor(props) {
    super(props);
    // this.delete = this.delete.bind(this);

    this.state = {
      component: 'project'
    }
  }

  // delete() {
  //   axios.delete(`/api/project?id=${this.props.project.id}`)
  //     .then(() => populateUser(this.props.name));
  // }

  render() {
    const project = this.props.project;
    let id = '';
    if (this.props.auth) {
      id = this.props.auth.id;
    }
    return (
      <Project className="users-projects">
          <Container>
            <ProjectImage src={`/images/${this.props.project.id}.png`} className="users-projects-image" />
            <TopRight>
              <VerificationModal item={this.props} component={this.state.component} />
            </TopRight>
          </Container>
        <Link to={`/project/${this.props.project.id}`}>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectDescription>{project.text}</ProjectDescription>
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
