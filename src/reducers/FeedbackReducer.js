const sampleFeedback = {
  project: {
    id: 0,
    title: 'Hue',
    url: 'https://jegishue.herokuapp.com/',
    github: 'https://github.com/jegis/hue',
    text: 'A reddit clone',
    contributor: 'James',
    userid: 1
  },
  list: [
    {
      id: 0,
      user: 'Jackie',
      text: 'this is great!!! hue is the best website ever!!!',
      type: 'general feedback'
    },
    {
      id: 1,
      user: 'Edward',
      text: 'this website is definitely the opposite of a bug',
      type: 'general feedback'
    }
  ]
};

const FeedbackReducer = (state = sampleFeedback, action) => {
  if (action.type === 'POPULATE_FEEDBACK') {
    return action.payload;
  }
  return state;
};
export default FeedbackReducer;
