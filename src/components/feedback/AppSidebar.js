/* Sidebar with the data (title, author, description, tech stack) of the app being reviewed. */
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
        <a href={project.url} >
          <h2>{project.title}</h2>
        </a>
        <p>
          {project.text}
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppSidebar);
