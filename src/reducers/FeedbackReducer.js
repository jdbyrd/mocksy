const FeedbackReducer = (state = {project: {}, list: [] }, action) => {
  if (action.type === 'POPULATE_FEEDBACK') {
    if (action.payload) {
      return action.payload;
    }
    return state;
  }
  return state;
};
export default FeedbackReducer;
