import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Modal, Select, Input, Button, message, Icon } from 'antd';
import LoginModal from '../login/LoginModal';
import { populateFeedback, populateUser } from '../../actions/index';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

class EditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false,
      text: this.props.text,
    };

    this.showModal = this.showModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.textChange = this.textChange.bind(this);
  }

  /* ****** MODAL FUNCTIONS ******* */
  showModal() {
    this.setState({ visible: true });
  }

  handleSubmit() {
    if (this.state.text === '') {
      message.error('Please provide a description');
    } else if(this.props.component === 'Feedback') {
      axios.post(
        '/api/feedback/update',
        {
          text: this.state.text,
          feedbackId: this.props.id
        }
      )
        .then(() => {
          this.setState({confirmLoading: true}, () => {
            // this is running just fine
            setTimeout(() => {
              populateFeedback(this.props.project_id);
              this.setState({
                // feedback type and text are not resetting
                visible: false,
                confirmLoading: false,
              });
            }, 1500);
          });
        });
      // this is never setting the state to true
      this.setState({
        confirmLoading: true
      });
    } else {
      axios.post(
        '/api/project/update',
        {
          text: this.state.text,
          projectId: this.props.id
        }
      )
        .then(() => {
          this.setState({confirmLoading: true}, () => {
            // this is running just fine
            setTimeout(() => {
              populateUser(this.props.name);
              this.setState({
                // feedback type and text are not resetting
                visible: false,
                confirmLoading: false,
              });
            }, 1500);
          });
        });
      // this is never setting the state to true
      this.setState({
        confirmLoading: true
      });
    }
  }

  handleCancel() {
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  }

  textChange(input) {
    this.setState({
      text: input.target.value
    });
  }

  /* ********* DROPDOWN FUNCTIONS ********* */
  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        {
          (this.props.auth && this.props.auth.username === this.props.name)?
            <Icon type="edit" onClick={this.showModal} />
            :
            null
        }

        <Modal
          title={'Edit '.concat(this.props.component)}
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={[
            <Button key="Cancel" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="Submit" type="primary" onClick={this.handleSubmit}>Submit</Button>,
          ]}
        >
          <form onSubmit={this.handleSubmit} id="form">
            <h4>Change your description here:</h4>
            <Input.TextArea rows={8} onChange={this.textChange} value={this.state.text} />
          </form>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(EditModal);
