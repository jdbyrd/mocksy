/* Feedback page for selected app. */
/* Consists of <AppSidebar>, <FeedbackList>, and <PostFeedbackModal>. */
import React from 'react';
import styled, { css } from 'styled-components';
import { Modal, Select, TextArea } from 'antd';
import { connect } from 'react-redux';
import AppSidebar from './AppSidebar';
import FeedbackList from './FeedbackList';
import { populateFeedback } from '../../actions/index';

const Button = styled.button`
  width: 120px;
  height: 30px;
  border-radius: 20px;
  padding: 0.15em 0.75em;
  margin: 0 1em;
  background: white;
  color: #323f48;
  border: 1.5px solid #323f48;
  &:hover {
    cursor: pointer;
  }

  
  ${props => props.primary && css`
    background: #323f48;
    color: white;
  `}
`;

class FeedbackPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }

  this.showModal = this.showModal.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleCancel = this.handleCancel.bind(this);
    //this.handleType = this.handleType.bind(this);
  }

  componentDidMount() {
    populateFeedback(this.props.match.params.id);
  }

  componentWillReceiveProps(nextprops){
    populateFeedback(nextprops.match.params.id);
  }

  // handleClick(e) {
  //   this.setState({visible: true})
  // }

  showModal() {
    this.setState({visible: true})
  }
  // handleSubmit(e) {
  //   console.log(e);
  //   this.setState({
  //     visible: false,
  //   });
  // }

  // handleCancel(e) {
  //   console.log(e);
  //   this.setState({
  //     visible: false,
  //   });
  // }

  // handleType(e) {
  //   console.log(`selected ${e}`);
  //   this.setState({feedbackType: e.target.value})
  // }

  // handleBlur() {
  //   console.log('blur');
  // }

  // handleFocus() {
  //   console.log('focus');
  // }

  render() {
    return (
      <div>
        <AppSidebar />
        <FeedbackList />
        <button onClick={this.showModal}>Open modal</button>
        
        <Modal
          title="PostFeedbackModal"
          width={500}
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
                onChange={this.handleType}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
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

export default FeedbackPage;
