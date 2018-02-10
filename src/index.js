import 'babel-polyfill';
import React from 'react';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
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

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

function bounce(val) {
  return spring(val, {
    stiffness: 400,
    damping: 32,
  });
}

const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

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
    this.setState({ homepage: bool });
  }

  render() {
    return (
      <div>
        <Navbar changeTriangle={this.changeTriangle} homepage={this.state.homepage} />
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className="route-wrapper"
        >
          <Route exact={true} path="/" render={() => (<FeedPage feed={this.state.triangle} isHomepage={this.isHomepage} />)} />
          <Route path="/project/:id" render={(props) => (<FeedbackPage {...props} isHomepage={this.isHomepage} />)} />
          <Route path="/user/:name" render={(props) => (<ProfilePage {...props} isHomepage={this.isHomepage} />)} />
          <Route path="/settings/:name" render={() => (<SettingsPage isHomepage={this.isHomepage} />)} />
          <Route path="/login" render={() => (<Login isHomepage={this.isHomepage} />)} />
          <Route render={() => (<div>404 lol</div>)} />
        </AnimatedSwitch>
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
