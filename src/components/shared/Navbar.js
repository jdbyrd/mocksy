import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import styled, { css } from 'styled-components';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

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
    console.log(this.props.auth);
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
            </ul>
            <div className="right-container">
              <Button shape="circle" icon="search" className="search" onClick={this.toggleSearch} />
              <span className="helper" />
               {this.props.auth ?
                <ul className="buttons-wrapper">
                  <li>
                    <img className="bell-icon" src="https://www.materialui.co/materialIcons/social/notifications_grey_192x192.png" />
                  </li>
                  <li className="img-dropdown-container">
                    <img
                      className="profile-pic"
                      alt="profile-pic"
                      src={this.props.auth.photos[0].value}
                      onClick={this.toggleDropdown}
                    />
                    <ul className="dropdown-container">
                      <div className="invisible-dropdown-helper" />
                      <div className="dropdown-triangle" />
                        <ul className="dropdown" onClick={this.toggleDropdown}>
                          <li><Link to={`/user/${this.props.auth.username}`}>Profile</Link></li>
                          <li>Your apps</li>
                          <li>Your reviews</li>
                          <li>Settings</li>
                          <li>
                            <a href="/logout">Logout</a>
                          </li>
                        </ul>
                    </ul>
                  </li>
                </ul>
                : <Login href="/auth/github">Login</Login>
              }
            </div>
          </div>
          <div id="triangle" />
          {this.state.search ? <h4 className="searchResults">HAHA YOU CAN&#39;T SEARCH!</h4> : null}
            

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Navbar);


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



const Login = styled.a`
  margin: 0;
  list-style-type: none;
  padding: 10px 20px;
`;


