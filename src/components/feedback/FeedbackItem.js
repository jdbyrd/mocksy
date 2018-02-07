import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Row, Col, Icon, message } from 'antd';
import { populateFeedback } from '../../actions/index';
import VerificationModal from '../shared/VerificationModal';
import PostFeedbackModal from './PostFeedbackModal';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

class FeedbackItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: this.props.item.up - this.props.item.down,
      toggled: this.props.item.vote || null,
      component: 'feedback'
    };

    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ total: nextProps.item.up - nextProps.item.down });
    if (nextProps.auth) {
      this.setState({
        toggled: nextProps.item.vote
      });
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.toggled !== this.state.toggled) {
      const difference = this.state.total - prevState.total;
      this.vote(difference);
    }
  }

  vote(difference) {
    axios.post('/api/votes',
      {
        votes_id: this.props.item.votes_id,
        feedback_id: this.props.item.id,
        vote: this.state.toggled,
        difference
      }
    )
      .then(() => {
        console.log('form added');
      });
  }

  upvote() {
    if (this.props.auth) {
      if (this.state.toggled) {
        this.setState({
          toggled: null,
          total: this.state.total - 1,
        });
      } else if (this.state.toggled === false) {
        this.setState({
          toggled: true,
          total: this.state.total + 2,
        });
      } else if (this.state.toggled === null) {
        this.setState({
          toggled: true,
          total: this.state.total + 1,
        });
      }
    } else {
      message.warning('Please log in to vote!');
    }
  }

  downvote() {
    if (this.props.auth) {
      if (this.state.toggled) {
        this.setState({
          toggled: false,
          total: this.state.total - 2,
        });
      } else if (this.state.toggled === false) {
        this.setState({
          toggled: null,
          total: this.state.total + 1,
        });
      } else if (this.state.toggled === null) {
        this.setState({
          toggled: false,
          total: this.state.total - 1,
        });
      }
    } else {
      message.warning('Please log in to vote!');
    }
  }

  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <div id="feedback-item">
        <Row>
          <Col span={20}>
            <h2>{item.options} by
              <Link to={`/user/${item.name}`}>
                &nbsp;{item.display_name}
              </Link>
            </h2>
          </Col>
          <Col span={1}>
            <h4>{this.state.total}</h4>
          </Col>
          <Col span={1}>
            { (this.state.toggled === false) || (this.state.toggled === null) ?
              <Icon
                type="up"
                value={1}
                onClick={this.upvote}
              /> :
              <Icon
                type="up-circle"
                onClick={this.upvote}
              />
            }
          </Col>
          <Col span={1}>
            { (this.state.toggled === null) || (this.state.toggled === true) ?
              <Icon
                type="down"
                value={-1}
                onClick={this.downvote}
              /> :
              <Icon
                type="down-circle"
                onClick={this.downvote}
              />
            }
          </Col>
          <Col span={1}>
            <VerificationModal item={item} component={this.state.component} />
            {this.state.auth ?
              <PostFeedbackModal text={item.text} />
              : null
            }
          </Col>
        </Row>
        <Row>
          <p>{item.text}</p>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackItem);
