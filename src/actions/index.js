import axios from 'axios';
import store from '../store';

const Store = {};

Store.populateFeed = (sort) => {
  axios(`/api/projects?sort=${sort}`)
    .then((res) => {
      store.dispatch({
        type: 'POPULATE_FEED',
        payload: res.data
      });
    });
};

Store.populateFeedback = (projectId, sort) => {
  axios(`/api/projects?id=${projectId}&sortFeedback=${sort}`)
    .then((res) => {
      console.log('res.data: ', res.data);
      store.dispatch({
        type: 'POPULATE_FEEDBACK',
        payload: res.data
      });
    });
};

Store.populateUser = async (userName) => {
  console.log('LOADING ' userName);
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

Store.filterKey = (filter) => {
  store.dispatch({
    type: 'FILTER',
    payload: filter
  });
};

Store.sortKey = (sort) => {
  store.dispatch({
    type: 'SORT',
    payload: sort
  });
};

module.exports = Store;
