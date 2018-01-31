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
          <img src="https://image.flaticon.com/icons/svg/25/25231.svg" />
        </div>
        <Button href="/auth/github">Login to Github</Button>
      </div>
    );
  }
}

export default (Login);