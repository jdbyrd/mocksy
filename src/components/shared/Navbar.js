import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
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
      viewMenu: false,
      menu: false,
      query: '',
      searchResults: [],
      showTriangle: true,
      showNotifications: false,
      notifications: []
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.readNotifications = this.readNotifications.bind(this);
    this.triangleLeft = this.triangleLeft.bind(this);
    this.triangleRight = this.triangleRight.bind(this);
    this.deleteNotification = this.deleteNotification.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount running');
    axios.get('/api/notifications')
      .then(data => this.setState({ notifications: data.data }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showTriangle: nextProps.homepage });
  }

  deleteNotification(feedbackid) {
    console.log('DELETE feedback_id: ', feedbackid);
    axios.post('/api/notifications', {
      feedbackid
    }).then((data) => this.setState({ notifications: data.data }));
  }

  displayResults(result, index) {
    const query = new RegExp(`^[${this.state.query}]`, 'i');
    let url = '';
    let name = '';
    if (result.name && query.test(result.name)) {
      url = `/user/${result.name}`;
      name = result.name;
    } else if (result.display_name && query.test(result.display_name)) {
      url = `/user/${result.name}`;
      name = result.display_name;
    } else if (result.title && query.test(result.title)) {
      url = `/project/${result.id}`;
      name = result.title;
    } else {
      return null;
    }
    return <li key={index}><a href={url}>{name}</a></li>;
  }

  handleSearch() {
    const query = document.getElementById('search').value;
    this.setState({ query });
    if (query) {
      axios(`/api/search?query=${query}`)
        .then((res) => {
          const results = [].concat(res.data.users, res.data.projects);
          this.setState({
            searchResults: results
          });
        });
    }
  }

  readNotifications() {
    console.log('NOTIFICATIONS: ', this.state.notifications);
    if (this.state.notifications.length) {
      this.setState({ showNotifications: !this.state.showNotifications });
      // axios.post('/api/notified', {
      //   notifications: this.props.notifications
      // });
    }
  }

  toggleDropdown() {
    this.setState({ viewMenu: !this.state.viewMenu });
  }

  triangleLeft() {
    const triangle = document.getElementById('triangle');
    triangle.style.transform = 'perspective(500px) translate3d(0px, 0px, 0px)';
    this.props.changeTriangle(false);
  }

  triangleRight() {
    const triangle = document.getElementById('triangle');
    triangle.style.transform = 'perspective(500px) translate3d(153px, 0px, 0px)';
    this.props.changeTriangle(true);
  }

  toggleMenu() {
    this.setState({
      menu: !this.state.menu,
    });
  }

  render() {
    return (
      <div>
        <div className="nav-wrapper">
          <div className="nav-inner-wrapper">

            <img className="hamburger-icon" onClick={this.toggleMenu} alt="hamburger-menu-icon" src="https://cdn0.iconfinder.com/data/icons/social-messaging-productivity-4/128/menu-2-512.png" />
            <div className="mobile-logo">
              <img src="./mocksylogo.png" className="mocksy-img" />ocksy
            </div>

            {this.state.menu &&
            <div className="menu-dropdown-container">
              <ul onClick={this.toggleMenu}>
                <Link to={"/"}><li onClick={this.triangleLeft}>Feed</li></Link>
                <Link to={"/"}><li onClick={this.triangleRight}>Popular</li></Link>
                <Link to={`/user/${this.props.auth.username}`}><li>Profile</li></Link>
                <Link to={"/"}><li>Search</li></Link>
                {this.props.auth ?
                  <Link to={"/logout"}><li>Logout</li></Link>
                :
                  <Link to={"/login"}><li>Login</li></Link>
                }
              </ul>
            </div>
            }

            <ul className="nav-links">
              <img src="./mocksylogo.png" className="mocksy-logo" />
              <Link to='/'>
                <li onClick={this.triangleLeft}>Feed</li>
              </Link>
              <Link to='/'>
                <li onClick={this.triangleRight}>Popular</li>
              </Link>
            </ul>

            {this.state.showNotifications && this.state.notifications.length ?
            <div className="notifications-container">
              <div className="notifications-triangle"></div>
              <div className="notifications">
                {this.state.notifications.map((notification, index) => {
                  return <Link to={`/project/${notification.project_id}`} key={index} onClick={() => this.deleteNotification(notification.id)}><p>{notification.name} has commented on {notification.title}</p></Link>
                })}
              </div>
            </div>
            : null }

            {this.props.notifications.length ? <div className="dot" /> : null}

            <div className="right-container">
              <div className="search">
                <input onChange={this.handleSearch} id="search" className="search-input" />
                {this.state.query &&
                <ul className={this.props.auth ? "search-results logged-in" : "search-results"}>
                  {this.state.searchResults.map((result, index) => this.displayResults(result, index))}
                </ul>
                }
              </div>
              <span className="helper" />
               {this.props.auth ?
                <ul className="buttons-wrapper">
                  <li>
                    <img className="bell-icon" onClick={this.readNotifications} src="https://cdn1.iconfinder.com/data/icons/freeline/32/bell_sound_notification_remind_reminder_ring_ringing_schedule-32.png" />
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
                          <li><Link to={`/settings/${this.props.auth.username}`}>Settings</Link></li>
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
          {this.state.showTriangle ?
            <div id="triangle" />
          : null}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Navbar);


// Don't delete these yet
// const Search = styled.input`
//   padding-right: 10px;
//   outline: none;
//   width: 5px;
//   height: 20px;
//   border-radius: 5px;
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


