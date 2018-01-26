import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import FeedPage from './components/feed/FeedPage';

// -------------FOR TESTING--------------
class App extends React.Component {
  render() {
    return (
      <div>
        HELLO SPENCER ARE YOU HAPPY NOW?
      </div>
    );
  }
}
// -------------FOR TESTING--------------

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('app')
);
