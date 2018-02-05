import React from 'react';
import 'antd/dist/antd.css'
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import FeedPage from './components/feed/FeedPage';
import FeedbackPage from './components/feedback/FeedbackPage';
import ProfilePage from './components/profile/ProfilePage';
import Login from './components/login/Login';
import Navbar from './components/shared/Navbar';
import SettingsPage from './components/settings/SettingsPage';
import { checkAuth, populateFeed } from './actions/index';
import './app.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      triangle: false,
      homepage: true
    };
    this.changeTriangle = this.changeTriangle.bind(this);
    this.isHomepage = this.isHomepage.bind(this);
  }

  componentDidMount() {
    checkAuth();
  }

  changeTriangle(bool) {
    this.setState({ triangle: bool });
  }

  componentDidUpdate() {
    populateFeed(this.state.triangle);
  }

  isHomepage(bool) {
    console.log('isHomepage running with bool: ', bool);
    this.setState({ homepage: bool });
  }

  render() {
    return (
      <div>
        <Navbar changeTriangle={this.changeTriangle} homepage={this.state.homepage} />
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
