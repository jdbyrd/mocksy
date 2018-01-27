/* Tab that renders that user's uploaded apps. */
import React from 'react';
import { connect } from 'react-redux';
import AppsTabCard from './AppsTabCard';

const mapStateToProps = state => (
  {
    projects: state.user.projects
  }
);

class AppsTab extends React.Component {
  render() {
    return (
      <div>
        {this.props.projects.map((project, index) => <AppsTabCard key={index} project={project} />)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppsTab);
