import React from 'react';
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
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ feedbackItems: nextProps.feedbackItems });
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
        {this.state.feedbackItems.length ?
          <h3 className="chart-title">Feedback by type</h3>
        : null}
        <svg width="400" height="250" className="svg">
          <Chart width={400} height={250} clickGraph={this.props.clickGraph} />
        </svg>

      </div>
    );
  }
}

export default connect(mapStateToProps)(AppSidebar);