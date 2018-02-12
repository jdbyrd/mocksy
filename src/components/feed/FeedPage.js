/* Contains dynamically rendered list of app cards in reverse chronological order. */
import React from 'react';
import { connect } from 'react-redux';
import AppCard from './AppCard';
import { populateFeed } from '../../actions/index';


const mapStateToProps = state => ({
  projects: state.projects,
  filterKey: state.filterKey,
  sortKey: state.sortKey,
  auth: state.auth
});

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    populateFeed();
    this.props.isHomepage(true);
  }

  sortProjects(projects, sort) {
    return sort === 'feedback'
      ?  [...projects].sort((p1, p2) => p2.num_feedback - p1.num_feedback)
      : sort === 'chron'
      ? [...projects].sort((p1, p2) => p1.created_at - p2.created_at)
      : projects;
  }

  filterByTag(project, index) {
    const containsTag = !!project.tags.filter(tag =>
      tag.tag === this.props.filterKey).length;
    if (this.props.filterKey === null || containsTag) {
      return <AppCard key={index} project={project} />;
    }
    return null;
  }

  render() {
    const sort = this.props.sortKey;
    const projects = this.sortProjects(this.props.projects, sort); 
    return (
      <div>
        {projects.map((project, index) => (
          this.filterByTag(project, index)
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedPage);
