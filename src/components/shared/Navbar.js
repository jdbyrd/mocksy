import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

const Nav = styled.div`
  width: 100%;
  height 60px;
  background: #90aab7;
  display: grid;
  grid-template-columns: 315px auto 300px;
`;

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  grid-column-start: 1;
  grid-column-end: 2;
  vertical-align: middle;
`;

const Li = styled.li`
  display: inline-block;
  padding: 20px 50px;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const RightContainer = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
`;

const Search = styled.input`
  display: inline-block;
  padding-right: 10px;
`;

const Helper = styled.span`
  display: inline-block;
  vertical-align: middle;
  height: 100%;
`;

const Bell = styled.img`
  height: 35px;
  vertical-align: middle;
  padding: 0 15px;
`;

const ImgContainer = styled.div`
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  display: inline-block;
  vertical-align: middle;
  border: 2px solid black;
`;

const ProfilePic = styled.img`
  width: 40px;
  border-radius: 40px;
`;

const Triangle = styled.div`
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid #90aab7;
  margin-left: 55px;
  width: 0;
  height: 0;
  transition-property: transform -webkit-transformv color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
`;

class Navbar extends React.Component {
  constructor(props) {
  	super(props)
    this.state = {
      profilePic: "http://2.bp.blogspot.com/-RJe3UG5Py1o/TzoOyLOMksI/AAAAAAAAA2U/metNEzpJnY8/s1600/funny-cat-face+1.jpg"
    }
  }

  triangleLeft() {
    document.getElementById('triangle');
    triangle.style.transform = 'perspective(500px) translate3d(0px, 0px, 0px)';
  }

  triangleRight(){
    document.getElementById('triangle');
    triangle.style.transform = 'perspective(500px) translate3d(150px, 0px, 0px)';
  }

  render() {
    return (
      <div>
        <Nav>
          <Ul>
            <Li onClick={this.triangleLeft}>Feed</Li>
            <Li onClick={this.triangleRight}>Popular</Li>
          </Ul>
          <RightContainer>
            <Search type="text" />
            <Helper className="helper"></Helper>
            <Bell className="bell-icon" src="https://www.materialui.co/materialIcons/social/notifications_grey_192x192.png" />
            <ImgContainer className="user-img-container">
              <ProfilePic src={this.state.profilePic}/>
            </ImgContainer>
          </RightContainer>
        </Nav>
        <Triangle id="triangle"/>
      </div>
    );
  }

}

export default Navbar;
