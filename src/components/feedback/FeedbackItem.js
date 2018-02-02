import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Row, Col, Icon } from 'antd';
import { populateFeedback } from '../../actions/index';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

class FeedbackItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }


  upvote() {
    this.setState({ total: this.state.total + 1 });
  }

  downvote() {
    this.setState({ total: this.state.total - 1 });
  }

  handleDelete() {
    console.log('Hey');
    console.log(this.props.item);
    axios.delete(`/api/feedback?id=${this.props.item.id}`)
      .then(() => populateFeedback(this.props.item.project_id));
  }

  render() {
    const item = this.props.item;
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
            <Icon
              type="up"
              value={1}
              onClick={this.upvote}
            />
          </Col>
          <Col span={1}>
            <Icon
              type="down"
              value={-1}
              onClick={this.downvote}
            />
          </Col>
          {(this.props.auth && this.props.auth.username === item.name)?
            <Col span={1}>
              <Icon
                type="close-circle"
                onClick={this.handleDelete}
              />
            </Col>
            :null
          }
        </Row>
        <Row>
          <p>{item.text}</p>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackItem);
