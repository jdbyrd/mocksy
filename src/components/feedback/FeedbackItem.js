import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Row, Col, Icon, Tooltip, message } from 'antd';
import VerificationModal from '../shared/VerificationModal';
import EditModal from '../shared/EditModal';

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
      component: 'feedback',
      marked: null
    };

    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.vote = this.vote.bind(this);
    this.check = this.check.bind(this);
    this.close = this.close.bind(this);
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

  /* ***************** VOTING ***************** */
  vote(difference) {
    axios.post('/api/votes',
      {
        votes_id: this.props.item.votes_id,
        feedback_id: this.props.item.id,
        vote: this.state.toggled,
        project_id: this.props.item.project_id,
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

  /* ***************** RESOLVING ISSUES ***************** */

  check() {
    if (this.props.auth) {
      if (this.state.marked) {
        this.setState({
          marked: null,
        });
      } else if (this.state.marked === false) {
        this.setState({
          marked: true,
        });
      } else if (this.state.marked === null) {
        this.setState({
          marked: true,
        });
      }
    }
  }

  close() {
    if (this.props.auth) {
      if (this.state.marked) {
        this.setState({
          marked: false,
        });
      } else if (this.state.marked === false) {
        this.setState({
          marked: null,
        });
      } else if (this.state.marked === null) {
        this.setState({
          marked: false,
        });
      }
    }
  }

  render() {
    const { item } = this.props;
    return (
      <div className={"feedback-item " + (this.state.marked !== null ? 'fade' : 'feedback-item')}>
        <Row>
          <Col span={2}>
            <Row>
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
            </Row>
            <Row>
              <h4>&nbsp;{this.state.total}</h4>
            </Row>
            <Row>
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
            </Row>
          </Col>
          <Col span={18}>
            <Row>
              <Link to={`/user/${item.name}`}>
                <img
                  className="feedback-icon"
                  alt="profile-pic"
                  src={item.avatar}
                />
              </Link>
              <h2>
                &nbsp;&nbsp;{item.options} by
                <Link to={`/user/${item.name}`}>
                  &nbsp;{item.display_name}
                </Link>
              </h2>
            </Row>
            <Row>
              <p>{item.text}</p>
              { this.state.marked ?
                <h6>The developer has marked this issue as resolved.</h6> : null
              }
              { this.state.marked === false ?
                <h6>The developer has marked this issue as unresolvable.</h6> : null
              }
            </Row>
          </Col>
          { (this.props.auth && this.props.auth.username === item.name) ?
            <Col>
              <Col span={1}>
                <Tooltip title="Mark as completed">
                { (this.state.marked === false) || (this.state.marked === null) ?
                    <Icon
                      type="check-circle-o"
                      onClick={this.check}
                    /> :
                    <Icon
                      type="check-circle"
                      onClick={this.check}
                      style={{ color: '#00d01f' }}
                    />
                }
                </Tooltip>
              </Col>
              <Col span={1}>
                <Tooltip title="Mark as unresolvable">
                { (this.state.marked === null) || (this.state.marked === true) ?
                    <Icon
                      type="close-circle-o"
                      onClick={this.close}
                    /> :
                    <Icon
                      type="close-circle"
                      onClick={this.close}
                      style={{ color: '#ff0000' }}
                    />
                }
                </Tooltip>
              </Col>
            </Col> : null
          }
          <Col span={1}>
            <EditModal
              name={item.name}
              text={item.text}
              id={item.id}
              project_id={item.project_id}
              component="feedback"
            />
          </Col>
          <Col span={1}>
            <VerificationModal
              item={item}
              component={this.state.component}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackItem);
