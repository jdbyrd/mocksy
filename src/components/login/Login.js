import React from 'react';
import { connect } from 'react-redux';
import { Tag, Button } from 'antd';
import axios from 'axios';

/* eslint-disable */

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.isHomepage(false);
  }

  render() {
    return (
      <div className = 'mocksyBlock'>
        <div className = 'mocksyText'>
          <img src="/images/ui/mocksylogo.png" />ocksy
        </div>
        <div className="loginButton">
          <Button type="primary" size="large" href="/auth/github">
            {'Login to Github      '} 
            <img src="/images/ui/github.png"/>
          </Button>
        </div>
      </div>
    );
  }
}

export default (Login);