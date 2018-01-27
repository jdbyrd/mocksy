import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import FeedPage from './components/feed/FeedPage';
import FeedbackPage from './components/feedback/FeedbackPage';
import ProfilePage from './components/profile/ProfilePage';
import Login from './components/login/Login';
import Navbar from './components/shared/Navbar';
import { populateFeed } from './actions/index';

class App extends React.Component {
  componentDidMount() {
    populateFeed();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact={true} path="/" render={() => (<FeedPage />)} />
          <Route path="/project/:id" render={(props) => (<FeedbackPage {...props}/>)} />
          <Route path="/user/:name" render={() => (<ProfilePage  {...props}/>)} />
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
