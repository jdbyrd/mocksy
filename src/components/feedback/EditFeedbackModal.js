import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Modal, Select, Input, Button, message } from 'antd';
import LoginModal from '../login/LoginModal';
import { populateFeedback } from '../../actions/index';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

class EditFeedbackModal extends React.Component {
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
      message.error('Please provide feedback');
    } else {
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
              console.log('PROJECT ID', this.props.project_id);
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
    }
  }

  handleCancel() {
    this.setState({
      visible: false,
      confirmLoading: false,
      text: '',
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
      <div className="modal">
        {
          this.props.auth ?
            <Button
              type="primary"
              onClick={this.showModal}
            >Post feedback
            </Button>
            :
            <LoginModal />
        }

        <Modal
          title="Edit feedback"
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
            <br /><br />
            <h4>Say something constructive about this app:</h4>
            <Input.TextArea rows={8} onChange={this.textChange} value={this.state.text} />
          </form>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(EditFeedbackModal);
