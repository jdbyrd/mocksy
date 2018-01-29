/* Contains screenshot of deployed app, title, author, description, tech stack, buttons to provide feedback or view feedback. */
import React from 'react';
import { Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

class AppCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offerFeedbackClicked: false,
      readFeedbackClicked: false
    };

    this.offerFeedback = this.offerFeedback.bind(this);
  }

  clickTag(e) {
    const tag = e.currentTarget.textContent.slice();
    this.props.getQuery(tag);
  }

  github() {
    console.log('github icon click handler');
  }

  offerFeedback() {
    console.log('offerFeedback click handler running');
    this.setState({offerFeedbackClicked: true});
    //trigger postfeedbackmodal here
  }

  render() {
    return (
      <ProjectContainer>
        <ImgLink href={this.props.project.url}>
          <ProjectImg src={this.props.project.image} />
        </ImgLink>
        <ProjectDetailsContainer>
          <ProjectDetails>
            <TitleContainer>
              <a href={this.props.project.url}>
                <Title>{this.props.project.title}</Title>
              </a>
              <a href={this.props.project.github} target="_blank">
                <GitIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ei-sc-github.svg/768px-Ei-sc-github.svg.png" />
              </a>
            </TitleContainer>

            <Link to={`/user/${this.props.project.user}`}>
              <Contributor>{this.props.project.user}</Contributor>
            </Link>

            <Description>{this.props.project.text}</Description>

            <span>{this.props.project.tags.map((tag) =>
              <Tag color="blue" onClick={(e) => this.clickTag(e)} key={tag}>{tag}</Tag>)}
            </span>
            <br /><br />
            <span>
              <Link to='TRIGGER MODAL HERE'>
                <Button type="primary" onClick={this.offerFeedback}>Offer feedback</Button>&nbsp; &nbsp; &nbsp;
              </Link>
              <Link to={`/project/${this.props.project.id}`}>
                <Button>Read feedback</Button>
              </Link>
            </span>     
          </ProjectDetails>
        </ProjectDetailsContainer>
      </ProjectContainer>
    );
  }
}

export default AppCard;


const ProjectContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 7.5% 40% 5% 35.5% 12%;
  grid-template-rows: 22%;
`;

const ImgLink = styled.a`
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
  grid-column-start: 2;
  grid-column-end: 3;
  margin-bottom: 40px;
`;

const ProjectImg = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  border: 1px solid #cecece
`;

const ProjectDetailsContainer = styled.div`
  width: 100%;
  padding-bottom: 56.25%;
  grid-column-start: 4;
  grid-column-end: 5;
  position: relative;
  margin-bottom: 40px;
`;

const ProjectDetails = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
`;

const TitleContainer = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: 75% auto 50px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  padding: 0;
  width: 85%;
  display: inline-block;
  line-height: 50px;
  grid-column-start: 1;
  grid-column-end: 2;
`;

const GitIcon = styled.img`
  width: 50px;
  height: 50px;
  vertical-align: top;
  grid-column-start: 3;
  grid-column-end: 4;
  &:hover {
    cursor: pointer;
  }
`;

const Contributor = styled.p`
  font-color: black;
  margin-top: -10px;
  padding: 0;
`;

const Description = styled.p`
  font-color: black;
`;
