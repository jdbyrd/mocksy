import axios from 'axios';
import store from '../store';

export const populateFeed = () => {
  axios('/feed')
    .then((res) => {
      store.dispatch({
        type: 'POPULATE_FEED',
        payload: res.data.results
      });
    });
};
