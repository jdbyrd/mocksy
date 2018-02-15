import React from 'react';
import { Tag } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Chart from './Chart';

const mapStateToProps = state => (
  {
    project: state.feedback.project,
    contibutors: state.feedback.contributors,
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
    const browserWidth = window.innerWidth || document.body.clientWidth;
    let width;
    if (browserWidth > 1350) {
      width = 400;
    } else {
      width = 300;
    }
    return (
      <div>
        <a href={`${project.url}`} >
          <img
            src={`/images/${project.id}.png`}
            alt="app image"
            className="users-projects-image"
          />
          <br /><br />
        </a>
        <Link to={`/user/${project.name}`}>
          <h3 className="contributors">{project.display_name}</h3>
        </Link>
        <h4>{'Contributors: '}
          {
            this.props.contibutors ?
            this.props.contibutors.map((data, index) => {
              if (data.display_name) {
                return (
                  <Link to={`/user/${data.contributor}`}>
                    <span className="contributors">{data.display_name}</span>
                  </Link>
                );
              }
              return (<a className="contributors "href={`https://www.github.com/${data.contributor}`}>{index === 0 ? data.contributor : `, ${data.contributor}`}</a>);
            })
            :
            null
          }
        </h4>
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

        <svg width={width} height="250" className="svg">
          <Chart width={width} height={200} clickGraph={this.props.clickGraph} />
        </svg>

      </div>
    );
  }
}

export default connect(mapStateToProps)(AppSidebar);