/* Header with Github photo, name, bio, and Github link. */
import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';


const mapStateToProps = state => (
  {
    user: state.user.profile
  }
);

class UserHeader extends React.Component {
  render() {
    return (
      <div className="user-header-container">
        <div className="user-img-container">
          <UserImg src="https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/6/6e/Double_chins_by_pictoron-d4ogfds.png/revision/latest?cb=20160521152119" />
        </div>
        <UserInfo>
          <UserName>Alice Bob</UserName>
          <UserJob>Software Engineer @ Hack Reactor</UserJob>
        </UserInfo>
        <a href={"#"} target="_blank">
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