import React from 'react';
import { Modal, Button, Input, Tag, Icon, Tooltip, Row, Col } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import styled, { css } from 'styled-components';

class AppsTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      tags: [],
      inputVisible: false,
      inputValue: '',
    };

    this.showModal = this.showModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.showInput = this.showInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
    this.saveInputRef = this.saveInputRef.bind(this);
    this.projectFormSubmit = this.projectFormSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal() {
    this.setState({ visible: true });
  }

  /************ TAG HANDLERS *************/
  handleClose(removedTag) {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  showInput() {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm() {
    const state = this.state;
    const inputValue = this.state.inputValue;
    let tags = this.state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef(input) {
    this.input = input;
  }

  /************ FORM SUBMISSION *************/
  projectFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const form = {};
    for (let pair of data.entries()) {
      form[pair[0]] = pair[1];
    }
    axios.post('/api/project', form)
      .then(() => {
        console.log('form added');
      });
    this.setState({ visible: false });
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <Wrapper>
        <AddProjectButton
          type="primary"
          onClick={this.showModal}
        >+
        </AddProjectButton>
        <Instructions>Add a project</Instructions>
        <Modal
          title="Post an app"
          width={800}
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={[
            <Button key="Cancel" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="Submit" type="primary" onClick={this.handleSubmit}>Submit</Button>,
          ]}
        >
          <form onSubmit={this.projectFormSubmit}>
            <Row gutter={16}>
              <Col span={8}>
                <div className="field">
                  <h4>Application URL:</h4>
                  <Input />
                </div>
                <br />
                <div className="field">
                  <h4>Github URL (optional):</h4>
                  <Input addonBefore="https://"/>
                </div>
                <br />
                <div className="field">
                  <h4>Technologies:</h4>
                  {this.state.tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                  })}
                  {this.state.inputVisible && (
                    <Input
                      ref={this.saveInputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={this.state.inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputConfirm}
                      onPressEnter={this.handleInputConfirm}
                    />
                  )}
                  {!this.state.inputVisible && (
                    <Tag
                      onClick={this.showInput}
                      style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                      <Icon type="plus" /> New Tag
                    </Tag>
                  )}
                </div>
              </Col>
              <Col span={16}>
                <div className="field">
                  <h4>Title:</h4>
                  <Input />
                </div>
                <br />
                <div className="field">
                  <h4>Contributors (optional):</h4>
                  <Input />
                </div>
                <br />
                <div className="field">
                  <h4>Description:</h4>
                  <Input.TextArea rows={4} />
                </div>
              </Col>
            </Row>
          </form>
        </Modal>
      </Wrapper>
    );
  }
}

export default (AppsTab);

const Wrapper = styled.div`
  width: 33%;
  height: 278px;
  display: inline-block;
`;

const AddProjectButton = styled.div`
  width: 400px;
  text-align: center;
  height: 200px;
  border: 1px solid black;
  line-height: 200px;
  font-size: 35px;
  margin: auto;
  cursor: pointer;
`;

const Instructions = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
`;

