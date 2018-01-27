const sampleFeedback = {
  project: {
    id: 0,
    title: 'Hue',
    url: 'https://jegishue.herokuapp.com/',
    github: 'https://github.com/jegis/hue',
    text: 'A reddit clone for weird people.',
    contributor: 'James Byrd',
    userid: 1
  },
  list: [
    {
      id: 0,
      user: 'Jackie Fu',
      text: 'Not sure if I would use this site. Seems buggy and the upvote/downvote system does not work.',
      type: 'general feedback'
    },
    {
      id: 1,
      user: 'Edward White',
      text: "The entire website is a bug. Rick spent hours debugging and still didn't catch everything.",
      type: 'bug fixes'
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
