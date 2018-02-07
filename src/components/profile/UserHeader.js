/* Header with Github photo, name, bio, and Github link. */
import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import axios from 'axios';
/* eslint-disable */

const mapStateToProps = state => (
  {
    user: state.user.user,
    auth: state.auth
  }
);

class UserHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: this.props.user.bio || '',
      editable: this.props.user.bio ? false : true
    }

    this.handleBio = this.handleBio.bind(this);
    this.toggleEditable = this.toggleEditable.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ bio: nextProps.user.bio });
  }

  handleBio(e) {
    this.setState({
      bio: e.target.value
    });
  }

  toggleEditable() {
    if (!this.state.bio.length) {
      return;
    } else {
      this.setState({editable: !this.state.editable});
      axios.post('/api/bio', {
        text: this.state.bio
      });
    }
  }

  render() {
    const user = this.props.user;
    return (
      <div className="user-header-container">
        <div className="user-img-container">
          <UserImg src={user.avatar} />
        </div>
        <UserInfo>
          <UserName>{user.display_name}</UserName>
          <UserJob>
            { this.state.editable && this.props.auth ? 
              <Input 
                placeholder="Tell us about yourself!"
                onChange={this.handleBio}
                value={this.state.bio}
                onBlur={this.toggleEditable}
                size="small"
              /> :
              <h4 onClick={this.toggleEditable}>{this.state.bio}</h4>
            }
          </UserJob>
        </UserInfo>
        <a href={user.github_profile} target="_blank">
          <UserGithub src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ei-sc-github.svg/768px-Ei-sc-github.svg.png" />
        </a>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserHeader);

const UserImg = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid #cecece;
  border-radius: 50px;
`;

const UserInfo = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  position: relative;
  padding-top: 30px;

`;

const UserName = styled.div`
  font-size: 28px;
`;

const UserJob = styled.div`
  margin-top: -5px;
  width: 500px;
`;

const UserGithub = styled.img`
  width: 50px;
  height: 50px;
  vertical-align: top;
  grid-column-start: 4;
  grid-column-end: 5;
  &:hover {
    cursor: pointer;
  }
`;