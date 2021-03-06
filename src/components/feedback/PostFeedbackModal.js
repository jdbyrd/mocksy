import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Modal, Select, Input, Button, message } from 'antd';
import LoginModal from '../login/LoginModal';
import { populateFeedback } from '../../actions/index';
import PicturesWall from './PicturesWall';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

class PostFeedbackModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false,
      feedbackType: null,
      text: '',
      endpoint: 'http://127.0.0.1:3000',
      hasImages: false,
      ModalText: 'Content of the modal'
    };

    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleType = this.handleType.bind(this);
    this.textChange = this.textChange.bind(this);
    this.socket = io(this.state.endpoint);
    this.updateImageStatus = this.updateImageStatus.bind(this);
  }

  /* ****** MODAL FUNCTIONS ******* */
  showModal() {
    this.setState({ visible: true });
  }

  async handleOk() {
    let feedbackId;
    if (!this.state.feedbackType) {
      message.error('Please select a feedback option');
    } else if (this.state.text === '') {
      message.error('Please provide feedback');
    } else {
      const res = await axios.post('/api/feedback', {
        text: this.state.text,
        type: this.state.feedbackType,
        projectId: this.props.id,
        hasImages: this.state.hasImages
      });
      feedbackId = res.data.feedbackId;
      this.setState({ confirmLoading: true });
        // this is running just fine
        setTimeout(() => {
          populateFeedback(this.props.id);
          this.setState({
            // feedback type and text are not resetting
            visible: false,
            confirmLoading: false,
            feedbackType: null,
            text: '',
          });
        }, 1500);
      };
      if (this.props.name) {
        console.log('if running');
        this.socket.emit('post feedback', this.props.auth.username, this.props.title, this.props.name, this.state.text, this.props.id);
      } else {
        console.log('else running');
        this.socket.emit('post feedback', this.props.auth.username, this.props.title, this.props.userid, this.state.text, this.props.id);
      }
      console.log('this.props.id: ', this.props.id);

      // this is never setting the state to true
      // this.setState({
      //   confirmLoading: true
      // });
    axios.put('/api/feedback/images', { id: feedbackId });
  }

  handleCancel() {
    axios.delete('/api/feedback/images');
    this.setState({
      visible: false,
      confirmLoading: false,
      feedbackType: 0,
      text: '',
    });
  }

  textChange(input) {
    this.setState({
      text: input.target.value
    });
  }

  updateImageStatus(bool) {
    this.setState({ hasImages: bool });
  }

  /* ********* DROPDOWN FUNCTIONS ********* */
  handleType(value) {
    this.setState({ feedbackType: value });
  }

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
          title="Post feedback"
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // footer={[
          //   <Button key="Cancel" onClick={this.handleCancel}>Cancel</Button>,
          //   <Button key="Submit" type="primary" onClick={this.handleOk}>Submit</Button>,
          // ]}
        >
          <form onSubmit={this.handleOk} id="form">
            <h4>What kind of feedback are you leaving?</h4>
            <Select
              style={{ width: 300 }}
              placeholder="Select feedback type"
              onChange={this.handleType}
            >
              <Select.Option value={1}>General feedback</Select.Option>
              <Select.Option value={2}>Feature suggestion</Select.Option>
              <Select.Option value={3}>Bug report</Select.Option>
              <Select.Option value={4}>Code review</Select.Option>
              <Select.Option value={5}>Design critique</Select.Option>
              <Select.Option value={6}>Other...</Select.Option>
            </Select>
            <br /><br />
            <h4>Say something constructive about this app:</h4>
            <Input.TextArea rows={8} onChange={this.textChange} value={this.state.text} />
            <br /><br />
            <h4>Upload a helpful screenshot or image (optional):</h4>
            <PicturesWall updateImageStatus={this.updateImageStatus} />
          </form>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PostFeedbackModal);
