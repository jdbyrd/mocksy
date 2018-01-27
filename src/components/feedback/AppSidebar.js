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
        {project.title}
        {project.type}
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppSidebar);
