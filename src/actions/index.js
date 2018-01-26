import axios from 'axios';
import store from '../store';

const Store = {};

Store.populateFeed = () => {
  axios('/api/projects')
    .then((res) => {
      store.dispatch({
        type: 'POPULATE_FEED',
        payload: res.data.results
      });
    });
};

Store.feedbackFeed = (projectId) => {
  axios('/api/project')
    .then((res) => {
      store.dispatch({
        type: 'POPULATE_FEEDBACK',
        payload: res.data.results
      });
    });
};


module.exports = Store;
