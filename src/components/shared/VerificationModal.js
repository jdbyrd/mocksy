import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Icon } from 'antd';
import { populateFeedback } from '../../actions/index';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

class VerificationModal extends React.Component {
  constructor(props) {
    super(props);

    this.showConfirm = this.showConfirm.bind(this);
  }

  showConfirm() {
    var that = this;
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      content: 'Your data cannot be recovered after deleting.',
      onOk() {
        axios.delete(`/api/feedback?id=${that.props.item.id}`)
          .then(() => populateFeedback(that.props.item.project_id));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    const { item } = this.props;
    return (
      <div>
        {(this.props.auth && this.props.auth.username === item.name) ?
          <Icon
            type="close-circle"
            onClick={this.showConfirm}
          /> : null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(VerificationModal);
