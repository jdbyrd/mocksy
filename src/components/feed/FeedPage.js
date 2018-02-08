/* Contains dynamically rendered list of app cards in reverse chronological order. */
import React from 'react';
import { connect } from 'react-redux';
import AppCard from './AppCard';
import { populateFeed } from '../../actions/index';


const mapStateToProps = state => ({
  projects: state.projects,
  filterProjects: state.filterProjects
});

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // query: 'all',
    };
    // this.getQuery = this.getQuery.bind(this);
  }

  componentDidMount() {
    populateFeed();
    this.props.isHomepage(true);
  }

  // getQuery(tag) {
  //   this.setState({ query: tag });
  // }

  filterByTag(project, index) {
    const containsQuery = !!project.tags.filter(tag =>
      tag.tag === this.props.filterProjects).length;
    if (this.props.filterProjects === 'all' || containsQuery) {
      return <AppCard key={index} project={project} getQuery={this.getQuery} />;
    }
    return null;
  }

  render() {
    console.log(this.props.projects);
    return (
      <div>
        {this.props.projects.map((project, index) => (
          this.filterByTag(project, index)
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedPage);
