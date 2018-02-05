import React from 'react';
import { connect } from 'react-redux';

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
        <img src={`/images/${project.id}.png`} alt="app image" className="users-projects-image" />
        <br /><br />
        <a href={project.url} >
          <h2>{project.title}</h2>
        </a>
        <a href={`/users/${project.user_id}`}>
          <h3>{project.user_id}</h3>
        </a>
        <p>
          {project.text}
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppSidebar);