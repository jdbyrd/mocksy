import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';
import styled, { css } from 'styled-components';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: 'http://2.bp.blogspot.com/-RJe3UG5Py1o/TzoOyLOMksI/AAAAAAAAA2U/metNEzpJnY8/s1600/funny-cat-face+1.jpg',
      viewMenu: false,
      search: false,
      menu: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleMenu =this.toggleMenu.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  toggleDropdown() {
    this.setState({ viewMenu: !this.state.viewMenu });
  }

  triangleLeft() {
    const triangle = document.getElementById('triangle');
    triangle.style.transform = 'perspective(500px) translate3d(0px, 0px, 0px)';
  }

  triangleRight() {
    const triangle = document.getElementById('triangle');
    triangle.style.transform = 'perspective(500px) translate3d(153px, 0px, 0px)';
  }

  toggleMenu() {
    this.setState({
      menu: !this.state.menu,
    });
  }

  toggleSearch() {
    console.log('search running')
    this.setState({ search: !this.state.search });
  }

  render() {
    return (
      <div>
        <div className="nav-wrapper">
          <div className="nav-inner-wrapper">
            <img className="hamburger-icon" onClick={this.toggleMenu} alt="hamburger-menu-icon" src="https://cdn0.iconfinder.com/data/icons/social-messaging-productivity-4/128/menu-2-512.png" />
            <img className="bell-icon mobile-view-bell-icon" alt="bell-icon" src="https://www.materialui.co/materialIcons/social/notifications_grey_192x192.png" />
            {this.state.menu &&
            <div className="menu-dropdown-container">
              <ul>
                <li>Feed</li>
                <li>Popular</li>
                <li>Search</li>
                <li>Login</li>
              </ul>
            </div>
            }
            <ul className="nav-links">
              <Link to='/'>
                <li onClick={this.triangleLeft}>Feed</li>
              </Link>
              <li onClick={this.triangleRight}>Popular</li>
              <li>
                <a href="/auth/github">Login</a>
              </li>
            </ul>
            <div className="right-container">
              <Button shape="circle" icon="search" onClick={this.toggleSearch} />
              <span className="helper" />
              <img className="bell-icon" src="https://www.materialui.co/materialIcons/social/notifications_grey_192x192.png" />
              <img
                className="profile-pic"
                alt="profile-pic"
                src={this.state.profilePic}
                onClick={this.toggleDropdown}
              />
            </div>
          </div>
          <div id="triangle" />
          {this.state.search ? <h4 className="searchResults">HAHA YOU CAN&#39;T SEARCH!</h4> : null}
          {this.state.viewMenu ?
            <div className="dropdown-container">
              <div className="dropdown-triangle" />
              <div className="dropdown">
                <ul>
                  <li>Profile</li>
                  <li>Your apps</li>
                  <li>Your reviews</li>
                  <li>Settings</li>
                  <li>
                    <a href="/logout">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          : null}
        </div>
      </div>
    );
  }
}

export default Navbar;

// Don't delete these yet
// const Search = styled.input`
//   display: inline-block;
//   padding-right: 10px;
//   outline: none;
//   width: 5px;
//   height: 20px;
//   border-radius: 15px;
//   padding-left: 10px;
//   -webkit-appearance: textfield;
//   -webkit-box-sizing: content-box;
//   font-family: inherit;
//   font-size: 100%;
//   color: transparent;
//   cursor: pointer;
//   background: #ededed url(https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png) no-repeat 4px center;
//   -webkit-transition: all .5s;
//   -moz-transition: all .5s;
//   transition: all .5s;
//   &:focus {
//     width: 130px;
//     color: #000;
//     cursor: auto;
//     padding-left: 27px;
//     border-color: white;
//   }
// `;

// const ImgContainer = styled.div`
//   background: white;
//   width: 40px;
//   height: 40px;
//   border-radius: 40px;
//   display: inline-block;
//   vertical-align: middle;
//   border: 2px solid white;
//   cursor: pointer;
// `;


