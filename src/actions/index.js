import axios from 'axios';
import store from '../store';

const Store = {};

Store.populateTags = () => {
  axios('/api/tags')
    .then((res) => {
      store.dispatch({
        type: 'POPULATE_TAGS',
        payload: res.data
      });
    });
};

Store.populateFeed = (sort) => {
  axios(`/api/projects?sort=${sort}`)
    .then((res) => {
      store.dispatch({
        type: 'POPULATE_FEED',
        payload: res.data
      });
    });
};

Store.populateFeedback = (projectId) => {
  axios(`/api/projects?id=${projectId}`)
    .then((res) => {
      store.dispatch({
        type: 'POPULATE_FEEDBACK',
        payload: res.data
      });
    });
};

Store.populateUser = async (userName) => {
  const res = await axios(`/api/profile?name=${userName}`);
  store.dispatch({
    type: 'POPULATE_USER',
    payload: res.data
  });
  return 'complete';
};

Store.checkAuth = () => {
  return axios('/auth/verify')
    .then((res) => {
      store.dispatch({
        type: 'CHECK_AUTH',
        payload: res.data
      });
      return res.data;
    });
};

module.exports = Store;
