import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import FeedPage from './components/feed/FeedPage';

class App extends React.Component {
  render() {
    return (
      <div>
      	HELLO SPENCER ARE YOU HAPPY NOW?
      </div>
    );
  }
}

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('app')
);
