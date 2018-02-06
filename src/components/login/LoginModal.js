import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Divider } from 'antd';
// import image from '../../../dist/github.png';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.showModal = this.showModal.bind(this);
    // this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div className="modal">
        { !this.props.auth ?
          <Button
            type="primary"
            onClick={this.showModal}
            onCancel={this.handleCancel}
          >
            Post feedback
          </Button> : null
        }
        <Modal
          title={null}
          visible={this.state.visible}
          footer={null}
        >
          <center>
            <h2>Want to share your opinion?</h2>
            <h4>Sign up with Github:</h4><br />
            <a href="/auth/github">
              <Button
                type="primary"
                size="large"
                shape="circle"
              >
                  <img src="../../../dist/github.png" />
              </Button>
            </a>
            <Divider />
            <span>Already have an account? <a id="link" href="/auth/github">Sign in.</a></span>
          </center>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginModal);
