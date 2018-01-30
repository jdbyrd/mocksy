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
import { populateFeed, checkAuth } from './actions/index';
import './app.scss';

class App extends React.Component {
  componentDidMount() {
    populateFeed();
    checkAuth();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact={true} path="/" render={() => (<FeedPage />)} />
          <Route path="/project/:id" render={(props) => (<FeedbackPage {...props}/>)} />
          <Route path="/user/:name" render={(props) => (<ProfilePage {...props}/>)} />
          <Route path="/login" render={() => (<Login />)} />
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
