import React from 'react';
import { Modal, Button, Icon } from 'antd';

class VerificationModal extends React.Component {
  constructor(props) {
    super(props);

    this.showConfirm = this.showConfirm.bind(this);
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
  }

  showConfirm() {
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      content: 'Your data cannot be recovered after deleting.',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    return (
      <div>
        <Icon
          type="close-circle"
          onClick={this.showConfirm}
        />
      </div>
    );
  }
}

export default VerificationModal;
