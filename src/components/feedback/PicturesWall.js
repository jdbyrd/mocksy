import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => ({
  auth: state.auth
});

class PicturesWall extends React.Component {
  constructor() {
    super();
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      tempId: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({ tempId: `${this.props.auth.username}_${Date.now()}` });
  }

  handleCancel() {
    this.setState({ previewVisible: false });
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ fileList }) {
    if (fileList.length > this.state.fileList.length) {
      const { tempId } = this.state;
      fileList[fileList.length - 1].url = `images/feedback/${tempId}_${fileList.length}`;
    }
    this.setState({ fileList });
  }

  removeImage(file) {
    const target = file.url.substring(16);
    axios.delete('/api/feedback/images', { params: { target } });
  }

  render() {
    // console.log('this.props:', this.props);
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return this.props.upload
      ?
      (
        <div className="clearfix">
          <Upload
            action={`/api/feedback/images?id=${this.state.tempId}_${fileList.length + 1}`}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            onRemove={this.removeImage}
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      )
      :
      (
        <div className="clearfix">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
          />
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      );
  }
}

export default connect(mapStateToProps)(PicturesWall);
