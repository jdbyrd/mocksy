import React from 'react';
import { Tag } from 'antd';
import { connect } from 'react-redux';
import Chart from './Chart';

const mapStateToProps = state => (
  {
    project: state.feedback.project,
    feedbackItems: state.feedback.list
  }
);

class AppSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackItems: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ feedbackItems: nextProps.feedbackItems });
  }

  render() {
    const project = this.props.project;
    console.log(project);
    return (
      <div>
        <a href={`${project.url}`} >
          <img
            src={`/images/apps/${project.id}.png`}
            alt="app image"
            className="users-projects-image"
          />
          <br /><br />
        </a>
        <a href={`/users/${project.name}`}>
          <h3>{project.display_name}</h3>
        </a>
        <p>
          {project.text}
        </p>
        <span>
          {
            project.tags && project.tags.length ?
            project.tags.map(tag => (
              <Tag
                color="blue"
                key={`${tag.tag}_${tag.project_id}`}
              >{tag.tag}</Tag>
            ))
            : <span />
          }
        </span>

        <svg width="400" height="250" className="svg">
          <Chart width={400} height={200} clickGraph={this.props.clickGraph} />
        </svg>

      </div>
    );
  }
}

export default connect(mapStateToProps)(AppSidebar);