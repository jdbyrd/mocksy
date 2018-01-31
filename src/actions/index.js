import axios from 'axios';
import store from '../store';

const Store = {};

Store.populateTags = () => {
  axios('/api/tags')
    .then((res) => {
      console.log('TAGS', res.data);
      store.dispatch({
        type: 'POPULATE_TAGS',
        payload: res.data
      });
    });
};

Store.populateFeed = () => {
  axios('/api/projects')
    .then((res) => {
      console.log('PROJECT', res.data);
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

Store.populateUser = (userName) => {
  axios(`/api/profile?name=${userName}`)
    .then((res) => {
      store.dispatch({
        type: 'POPULATE_USER',
        payload: res.data
      });
    });
};

Store.checkAuth = () => {
  axios('/auth/verify')
    .then((res) => {
      console.log(res);
      store.dispatch({
        type: 'CHECK_AUTH',
        payload: res.data
      });
    });
};

module.exports = Store;
