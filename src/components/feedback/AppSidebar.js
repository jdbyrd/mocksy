import React from 'react';
import { connect } from 'react-redux';
import GraphSection from './GraphSection';

const mapStateToProps = state => (
  {
    project: state.feedback.project
  }
);

class AppSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const project = this.props.project;
    return (
      <div>
        <a href={project.url} >
          <img
            src={`/images/${project.id}.png`}
            alt="app image"
            className="users-projects-image"
          />
          <br /><br />
          <h2>{project.title}</h2>
        </a>
        <a href={`/users/${project.user_id}`}>
          <h3>{project.user_id}</h3>
        </a>
        <p>
          {project.text}
        </p>
        <GraphSection />
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppSidebar);