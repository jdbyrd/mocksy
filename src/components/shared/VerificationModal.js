import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Icon } from 'antd';
import { populateFeedback } from '../../actions/index';
import { populateUser } from '../../actions/index';

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
        if ( that.props.component === 'feedback' ) {
          axios.delete(`/api/feedback?id=${that.props.item.id}&projectid=${that.props.item.project_id}`)
            .then(() => populateFeedback(that.props.item.project_id));
        } else if ( that.props.component === 'project' ) {
          axios.delete(`/api/project?id=${that.props.item.project.id}`)
            .then(() => populateUser(that.props.item.name));
        } else if ( that.props.component === 'feedbackTab') {
          axios.delete(`/api/feedback?id=${that.props.item.id}&projectid=${that.props.project.id}`)
            .then(() => populateUser(that.props.user.name));
        }
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
        <Icon
          type="delete"
          onClick={this.showConfirm}
          className="icon-hover"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(VerificationModal);
