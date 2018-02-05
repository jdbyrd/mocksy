import React from 'react';
import { Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import PostFeedbackModal from '../feedback/PostFeedbackModal';

class AppCard extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.project.tags)
  }

  clickTag(e) {
    const tag = e.currentTarget.textContent.slice();
    this.props.getQuery(tag);
  }

  github() {
    console.log('github icon click handler');
  }

  render() {
    return (
      <div className="project-container">
        <a className="img-link" href={this.props.project.url}>
          <img className="project-img" src={`/images/${this.props.project.id}.png`} />
        </a>
        <div className="project-details-container">
          <div className="project-details">
            <div className="title-container">
              <a href={`/project/${this.props.project.id}`}>
                <div className="title">{this.props.project.title}</div>
              </a>
              <a href={this.props.project.github} target="_blank">
                <GitIcon className="git-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ei-sc-github.svg/768px-Ei-sc-github.svg.png" />
              </a>
            </div>

            <Link to={`/user/${this.props.project.user}`}>
              <Contributor>{this.props.project.user}</Contributor>
            </Link>
            <Description>
              <Link to={`/user/${this.props.project.name}`}>
                {this.props.project.display_name}
              </Link>
            </Description>
            <Description>{this.props.project.text}</Description>

            <span>
            {
              this.props.project.tags ?
              this.props.project.tags.map((tag) =>
                <Tag color="blue" onClick={e => this.clickTag(e)} key={tag}>{tag}</Tag>) : <span />
            }
            </span>
            <br /><br />
            <span>
              <PostFeedbackModal id={this.props.project.id} />
                <Link to={`/project/${this.props.project.id}`}>
                  <Button>Read feedback</Button>
                </Link>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default AppCard;

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
