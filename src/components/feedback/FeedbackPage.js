import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Select } from 'antd';
import { populateFeedback } from '../../actions/index';

import AppSidebar from './AppSidebar';
import FeedbackList from './FeedbackList';
import PostFeedbackModal from './PostFeedbackModal';
import LoginModal from '../login/LoginModal';

const mapStateToProps = state => (
  {
    project: state.feedback.project,
    auth: state.auth
  }
);

class FeedbackPage extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedValue: 'newest',
      barClicked: 'all',
      justVoted: false
    };
    this.handleSort = this.handleSort.bind(this);
    this.clickGraph = this.clickGraph.bind(this);
    this.voteHandler = this.voteHandler.bind(this);
  }
  componentDidMount() {
    populateFeedback(this.props.match.params.id);
    this.props.isHomepage(false);
  }

  // componentWillReceiveProps(nextProps) {
  //   populateFeedback(nextProps.match.params.id);
  // }

  handleSort(e) {
    this.setState({
      selectedValue: e,
      barClicked: 'all'
    }, () => populateFeedback(this.props.project.id, e));
  }

  voteHandler() {
    this.setState({ justVoted: true });
  }

  clickGraph(e) {
    this.setState({ barClicked: e });
  }

  render() {
    const project = this.props.project;
    if (!this.state.justVoted) {
      window.scrollTo(0, 0);
    }
    return (
      <div>
        <div id="feedback-padding"></div>
        <div className="project-title-container">
          <h1>Feedback for {project.title}</h1>
        </div>
        <div className="app-sidebar">
          <AppSidebar clickGraph={this.clickGraph} />
        </div>
        <div className="feed-list">
          { this.props.auth ?
            <PostFeedbackModal id={this.props.match.params.id} title={this.props.project.title} userid={this.props.project['user_id']} /> :
            <LoginModal />
          }
          <Select
            value={this.state.selectedValue}
            style={{ width: 150 }}
            placeholder="Sort by"
            onChange={(e) => this.handleSort(e)}
          >
            <Select.Option value="newest">Newest</Select.Option>
            <Select.Option value="upvoted">Most upvoted</Select.Option>
            <Select.Option value="downvoted">Most downvoted</Select.Option>
            <Select.Option value="controversial">Most controversial</Select.Option>
          </Select>
          <br /><br /><br />
          <FeedbackList type={this.state.barClicked} voteHandler={this.voteHandler} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackPage);
