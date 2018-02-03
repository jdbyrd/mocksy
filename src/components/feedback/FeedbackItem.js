import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Row, Col, Icon, message } from 'antd';
import { populateFeedback } from '../../actions/index';
import VerificationModal from '../shared/VerificationModal';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

class FeedbackItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      toggled: null,
      component: 'feedback'
    };

    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
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
    console.log(this.state.toggled);
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
