import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { populateFeedback } from '../../actions/index';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

class FeedbackItem extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    axios.delete(`/api/feedback?id=${this.props.item.id}`)
      .then(() => populateFeedback());
  }

  render() {
    const item = this.props.item;
    return (
      <div id="feedback-item">
        <h2>{item.options} by
          <Link to={`/user/${item.name}`}>
            &nbsp;{item.display_name}
          </Link>
        </h2>
        <p>{item.text}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackItem);
