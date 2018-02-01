import React from 'react';
import { connect } from 'react-redux';
import { Tag, Button } from 'antd';
import axios from 'axios';

/* eslint-disable */

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <img src="./mocksylogo.png" />ocksy
        </div>
        <Button type="primary" size="large" href="/auth/github">
          {'Login to Github      '} 
          <img src="./github.png"/>
        </Button>
      </div>
    );
  }
}

export default (Login);