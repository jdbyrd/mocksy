import React from 'react';
import { Modal, Select, Option, Input, Button } from 'antd';

class PostFeedbackModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      feedbackType: ''
    }

    this.showModal = this.showModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleType = this.handleType.bind(this);
  }
  
  ////////////// MODAL FUNCTIONS /////////////
  showModal() {
    this.setState({visible: true});
  }

  handleSubmit(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  ////////////// DROPDOWN FUNCTIONS /////////////
  handleType(e) {
    console.log(e.target.value);
    this.setState({feedbackType: e.target.value})
  }

  render() {
    return (
      <div id="modal">
        <Button 
          type="primary"
          onClick={this.showModal}>Post feedback
        </Button>
        
        <Modal
          title="Post feedback"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={[
            <Button key="Cancel" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="Submit" type="primary" onClick={this.handleOk}>Submit</Button>,
          ]}
        >
          
          <div>
            <h4>What kind of feedback are you leaving?</h4>
            <Select
                style={{ width: 300 }}
                placeholder="Select feedback type"
                onChange={this.handleType}

              >
                <Select.Option value={1}>General feedback</Select.Option>
                <Select.Option value={2}>Feature suggestion</Select.Option>
                <Select.Option value={3}>Bug fixes</Select.Option>
                <Select.Option value={4}>Dependency recommendation</Select.Option>
                <Select.Option value={5}>Code review</Select.Option>
                <Select.Option value={6}>Design critique</Select.Option>
                <Select.Option value={7}>Other...</Select.Option>
            </Select>

            <br /><br />
          
            <h4>Say something constructive about this app:</h4>
            <Input.TextArea rows={8} />
          </div>
        
        </Modal>
      </div>
    );
  }
}

export default PostFeedbackModal;