/* Contains dynamically rendered list of app cards in reverse chronological order. */
import React from 'react';
import { connect } from 'react-redux';
import AppCard from './AppCard';

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  };
};

class FeedPage extends React.Component {
  render() {
    return (
      <div>
        {this.props.projects.map((project, index) => <AppCard key={index} project={project} />)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedPage);
