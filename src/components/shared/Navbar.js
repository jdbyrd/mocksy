import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import styled, { css } from 'styled-components';
import Store from '../../actions/index';

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
      notifications: [],
      bool: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.readNotifications = this.readNotifications.bind(this);
    this.triangleLeft = this.triangleLeft.bind(this);
    this.triangleRight = this.triangleRight.bind(this);
    this.deleteNotification = this.deleteNotification.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
  }

  componentDidMount() {
    axios.get('/api/notifications')
      .then(data => this.setState({ notifications: data.data }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications.length) {
      this.setState({
        notifications: nextProps.notifications,
        showTriangle: nextProps.homepage
      });
    } else {
      this.setState({ showTriangle: nextProps.homepage });
    }
  }

  componentDidUpdate() {
    if (this.state.bool) {
      axios.get('/api/notifications')
        .then(data => this.setState({
          notifications: data.data,
          bool: false
        }));
    }
  }

  deleteNotification(feedbackid, clickedX) {
    if (!clickedX) {
      clickedX = false;
    }
    axios.post('/api/notifications', {
      feedbackid
    }).then((data) => {
      this.setState({
        notifications: data.data,
        showNotifications: clickedX,
        bool: true
      });
    });
  }

  hideMenu() {
    this.setState({ bool: false });
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
    if (this.state.notifications.length) {
      this.setState({ showNotifications: !this.state.showNotifications });
    }
  }

  toggleDropdown() {
    this.setState({ viewMenu: !this.state.viewMenu });
  }

  triangleLeft() {
    const triangle = document.getElementById('triangle');
    triangle.style.transform = 'perspective(500px) translate3d(0px, 0px, 0px)';
    Store.filterKey(null);
    Store.sortKey('chron');
  }

  triangleRight() {
    const triangle = document.getElementById('triangle');
    triangle.style.transform = 'perspective(500px) translate3d(153px, 0px, 0px)';
    Store.filterKey(null);
    Store.sortKey('feedback');
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
            <Icon className="hamburger-icon" type="ellipsis" style={{ fontSize: 40, color: '#3f3f3f' }} onClick={this.toggleMenu} />

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
              <Link to='/'>
                <li onClick={this.triangleLeft}>Feed</li>
              </Link>
              <Link to='/'>
                <li onClick={this.triangleRight}>Popular</li>
              </Link>
            </ul>

            <div className="header-container">
              <Link to='/'>
                <img src="images/ui/mocksy-nav.png" className="mocksy-header" />
              </Link>
            </div>

            {this.state.showNotifications && this.state.notifications.length ?
              <div className="notifications-container">
                <div className="notifications-triangle" />
                <div className="notifications">
                  {this.state.notifications.map((notification, index) => {
                  return (<div className="notification-entry-container" key={index}>
                            <a href={`/project/${notification.project_id}`} onClick={() => this.deleteNotification(notification.id)}>
                              <p>{notification.name} has commented on {notification.title}</p>
                            </a>
                            <Icon
                              type="close-circle-o"
                              onClick={() => { this.deleteNotification(notification.id, true); }}
                              className="x-icon"
                            />
                          </div>);
                })}
                </div>
              </div>
            : null }
            {this.state.notifications.length && this.props.auth ? <div className="dot">{this.state.notifications.length}</div> : null}

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
                          <li><a href="/logout">Logout</a></li>
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

export default withRouter(connect(mapStateToProps)(Navbar));


const Login = styled.a`
  margin: 0;
  list-style-type: none;
  padding: 10px 20px;
`;


