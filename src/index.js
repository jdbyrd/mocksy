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
    this.changeTriangle = this.changeTriangle.bind(this);
    this.isHomepage = this.isHomepage.bind(this);
    this.getUser = this.getUser.bind(this);
    this.socket = io(this.state.endpoint);
  }

  componentDidMount() {
    checkAuth();
  }

  changeTriangle(bool) {
    this.setState({ triangle: bool });
  }

  componentWillUpdate() {
    populateFeed(this.state.triangle);
  }

  isHomepage(bool) {
    this.setState({ homepage: bool });
  }

  getUser() {
    return checkAuth().then(user => user.username);
  }

  render() {
    console.log('RENDERING RENDERING RENDERING RENDERING RENDERING RENDERING ')
    this.socket.on('connect', () => {
      this.getUser().then((data) => {
        axios.post('/api/sockets', {
          socketid: this.socket.id,
          username: data
        });
      });
    });

    this.socket.on('notification', (fromUser, project) => {
      const newMessage = {
        project,
        fromUser,
      };
      this.setState({
        notifications: [...this.state.notifications, newMessage]
      });
      console.log('push notification FROM: ', fromUser, ', project: ', project);
    });

    return (
      <div>
        <Navbar changeTriangle={this.changeTriangle} homepage={this.state.homepage} notifications={this.state.notifications} />
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
