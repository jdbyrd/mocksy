import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

const NavContainer = styled.div`
  margin-bottom: 70px;
`;

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
  border: 2px solid white;
`;

const ProfilePic = styled.img`
  width: 40px;
  border-radius: 40px;
`;

const Triangle = styled.div`
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid #90aab7;
  margin-left: 57px;
  width: 0;
  height: 0;
  transition-property: transform -webkit-transformv color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
`;

const DropdownContainer = styled.div`
  position: fixed;
  right: 10px;
`;

const Dropdown = styled.div`
  background: #90aab7;
`;

const DropdownTriangle = styled.div`
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid #90aab7;
  width: 0;
  height: 0;
`;

const DropdownUL = styled.ul`
  margin: 0;
  list-style-type: none;
`;

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: 'http://2.bp.blogspot.com/-RJe3UG5Py1o/TzoOyLOMksI/AAAAAAAAA2U/metNEzpJnY8/s1600/funny-cat-face+1.jpg',
      viewMenu: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    console.log('this: ', this);
    console.log('this.state: ', this.state);
    console.log('this.state.profilePic: ', this.state.profilePic);
    this.setState({ viewMenu: !this.state.viewMenu });
  }

  triangleLeft() {
    const triangle = document.getElementById('triangle');
    triangle.style.transform = 'perspective(500px) translate3d(0px, 0px, 0px)';
  }

  triangleRight(){
    const triangle = document.getElementById('triangle');
    triangle.style.transform = 'perspective(500px) translate3d(153px, 0px, 0px)';
  }

  render() {
    return (
      <div>
        <NavContainer>
          <Nav>
            <Ul>
              <Li onClick={this.triangleLeft}>Feed</Li>
              <Li onClick={this.triangleRight}>Popular</Li>
            </Ul>
            <RightContainer>
              <Search type="text" />
              <Helper className="helper" />
              <Bell className="bell-icon" src="https://www.materialui.co/materialIcons/social/notifications_grey_192x192.png" />
              <ImgContainer className="user-img-container">
                <ProfilePic
                  src={this.state.profilePic}
                  onClick={this.toggleDropdown}
                />
              </ImgContainer>
            </RightContainer>
          </Nav>
          <Triangle id="triangle" />
          {this.state.viewMenu ?
            <DropdownContainer>
              <DropdownTriangle />
              <Dropdown>
                <DropdownUL>
                  <li>Profile</li>
                  <li>Your apps</li>
                  <li>Your reviews</li>
                  <li>Settings</li>
                  <li>Sign out</li>
                </DropdownUL>
              </Dropdown>
            </DropdownContainer>
          : null}
        </NavContainer>
      </div>
    );
  }
}

export default Navbar;
