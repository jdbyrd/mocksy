/* Modal with input for type of feedback and body of feedback with submit button. */
import React from 'react';
import { Modal, Select, Input } from 'antd';
import Button from '../shared/button.js';
const Option = Select.Option;
const { TextArea } = Input;

class PostFeedbackModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      feedbackType: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleType = this.handleType.bind(this);
  }
  
  ////////////// MODAL FUNCTIONS /////////////
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleSubmit = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  ////////////// SELECT FUNCTIONS /////////////
  function handleType(e) {
    console.log(`selected ${e}`);
    this.setState({feedbackType: e.target.value})
  }

  function handleBlur() {
    console.log('blur');
  }

  function handleFocus() {
    console.log('focus');
  }

  render() {
    return (
      <div>
        <Modal
          title="PostFeedbackModal"
          width=500
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <h1>Post feedback</h1>
          
          <div>
            <h6>What kind of feedback are you leaving?</h6>
            <Select
                style={{ width: 200 }}
                placeholder="Select feedback type"
                onChange={handleType}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                <Option value={1}>General feedback</Option>
                <Option value={2}>Feature suggestion</Option>
                <Option value={3}>Bug fixes</Option>
                <Option value={4}>Dependency recommendation</Option>
                <Option value={5}>Code review</Option>
                <Option value={6}>Design critique</Option>
                <Option value={7}>Other...</Option>
            </Select>
          
            <h6>Say something constructive about this app:</h6>
            <TextArea rows={8}></TextArea>
          </div>
            
            <Button>Cancel</Button> <Button primary>Submit</Button>
        
        </Modal>
      </div>
    );
  }
}