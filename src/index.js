import 'babel-polyfill';
import React from 'react';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import store from './store';
import FeedPage from './components/feed/FeedPage';
import FeedbackPage from './components/feedback/FeedbackPage';
import ProfilePage from './components/profile/ProfilePage';
import Login from './components/login/Login';
import Navbar from './components/shared/Navbar';
import SettingsPage from './components/settings/SettingsPage';
import { checkAuth, populateFeed } from './actions/index';
import './app.scss';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triangle: false,
      homepage: true,
      notifications: [],
      endpoint: 'http://127.0.0.1:3000' // this is where we are connecting to with sockets
    };
    //this.deleteNotification = this.deleteNotification.bind(this);
    this.changeTriangle = this.changeTriangle.bind(this);
    this.isHomepage = this.isHomepage.bind(this);
    this.getUser = this.getUser.bind(this);
    this.socket = io(this.state.endpoint);
  }

  componentDidMount() {
    checkAuth();
    this.socket.on('connect', () => {
      this.getUser().then((data) => {
        axios.post('/api/sockets', {
          socketid: this.socket.id,
          username: data
        });
      });
    });

    this.socket.on('notification', (fromUser, project, feedbackInfo, collection) => {
      console.log('NOTIFICATIONS COMING IN FROM SOCKET');
      const newMessage = {
        project,
        fromUser,
        feedbackInfo,
        collection
      };
      console.log('THIS IS THE NEW MESSAGE: ', newMessage)
      this.setState({
        notifications: [newMessage]
      });
      console.log('push notification FROM: ', fromUser, ', project: ', project);
    });
  }

  changeTriangle(bool) {
    this.setState({ triangle: bool });
  }

  componentWillMount() {
    this.socket.removeAllListeners();
  }

  componentWillUpdate() {
    populateFeed(this.state.triangle);

    // this.socket.on('connect', () => {
    //   this.getUser().then((data) => {
    //     axios.post('/api/sockets', {
    //       socketid: this.socket.id,
    //       username: data
    //     });
    //   });
    // });

    // this.socket.on('notification', (fromUser, project, feedbackInfo, collection) => {
    //   console.log('NOTIFICATIONS COMING IN FROM SOCKET');
    //   const newMessage = {
    //     project,
    //     fromUser,
    //     feedbackInfo,
    //     collection
    //   };
    //   console.log('THIS IS THE NEW MESSAGE: ', newMessage)
    //   this.setState({
    //     notifications: [newMessage]
    //   });
    //   console.log('push notification FROM: ', fromUser, ', project: ', project);
    // });
  }

  // deleteNotification(projectid) {
  //   console.log('DELETE NOTIFCATION running');
  //   // const notificationsCopy = this.state.notifications.slice();
  //   // for (var i = 0; i < notificationsCopy.length; i++) {
  //   //   if (notificationsCopy[i].feedbackInfo.project_id === projectid) {
  //   //     notificationsCopy.splice(i, 1);
  //   //   }
  //   // }
  //   // this.setState({ notifications: notificationsCopy });
  // }

  isHomepage(bool) {
    this.setState({ homepage: bool });
  }

  getUser() {
    return checkAuth().then(user => user.username);
  }

  render() {
    return (
      <div>
        <Navbar changeTriangle={this.changeTriangle} homepage={this.state.homepage} notifications={this.state.notifications} checkAuth={checkAuth} />
        <Switch>
          <Route exact={true} path="/" render={() => (<FeedPage feed={this.state.triangle} isHomepage={this.isHomepage} />)} />
          <Route path="/project/:id" render={(props) => (<FeedbackPage {...props} isHomepage={this.isHomepage} />)} />
          <Route path="/user/:name" render={(props) => (<ProfilePage {...props} isHomepage={this.isHomepage} />)} />
          <Route path="/settings/:name" render={() => (<SettingsPage isHomepage={this.isHomepage} />)} />
          <Route path="/login" render={() => (<Login isHomepage={this.isHomepage} />)} />
          <Route render={() => (<div>404 lol</div>)} />
        </Switch>
      </div>
    );
  }
}

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('app')
);

export default connect(mapStateToProps)(App);
