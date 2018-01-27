/* Contains screenshot of deployed app, title, author, description, tech stack, buttons to provide feedback or view feedback. */
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const RepoContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 7.5% 40% 5% 35.5% 12%;
`;

const RepoImg = styled.img`
  width: 100%;
  height: 300px;
  grid-column-start: 2;
  grid-column-end: 3;
  margin-bottom: 40px;
  border: 1px solid #cecece;
`;

const RepoDetails = styled.div`
  height: 300px;
  grid-column-start: 4;
  grid-column-end: 5;
  margin-bottom: 40px;
`;

const TitleContainer = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: 75% auto 50px;
`;

const Title = styled.div`
  font-size: 30px;
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



const Button = styled.button`
  width: 120px;
  height: 30px;
  border-radius: 20px;
  padding: 0.15em 0.75em;
  margin: 0 1em;
  background: white;
  color: #323f48;
  border: 1.5px solid #323f48;
  &:hover {
    cursor: pointer;
  }

  
  ${props => props.primary && css`
    background: #323f48;
    color: white;
  `}
`;

const Tag = styled.button`
  font-family: "Monospace Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-block;
  line-height: 20px;
  height: 22px;
  padding: 0 7px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fafafa;
  font-size: 12px;
  -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  opacity: 1;
  margin-right: 8px;
  cursor: pointer;
  white-space: nowrap;
  color: #2f54eb;
  background: #f0f5ff;
  border-color: #adc6ff;
`;

class AppCard extends React.Component {
  constructor(props) {
    super(props);
  }

  clickTag(e) {
    const tag = e.currentTarget.textContent.slice();
    console.log('clickTag running with tag: ', tag);
  }

  github() {
    console.log('github icon click handler');
  }

  offerFeedback() {
    console.log('offerFeedback click handler running');
  }

  readFeedback() {
    console.log('readFeedback click handler running');
  }

  render() {
    return (
      <RepoContainer>
        <RepoImg src={this.props.project.image} />
        <RepoDetails>
          <TitleContainer>
            <Link to={`/project/${this.props.project.id}`}><Title>{this.props.project.title}</Title></Link>
            <a href={this.props.project.github} target="_blank"><GitIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ei-sc-github.svg/768px-Ei-sc-github.svg.png" /></a>
          </TitleContainer>
          <Link to={`/user/${this.props.project.user}`}><Contributor>{this.props.project.user}</Contributor></Link>
          <Description>{this.props.project.text}</Description>

          <p>Tech stack: {this.props.project.tags.map((tag) =>
            <Tag color="blue" onClick={(e) => this.clickTag(e)} key={tag}>{tag} </Tag>)}
          </p>
         
            <Button primary onClick={this.offerFeedback}>Offer feedback</Button>
            <Button onClick={this.readFeedback}>Read feedback</Button>
        
        </RepoDetails>
      </RepoContainer>
    );
  }
}

export default AppCard;
