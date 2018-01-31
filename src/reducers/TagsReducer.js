const TagsReducer = (state = [], action) => {
  if (action.type === 'POPULATE_TAGS') {
    return action.payload;
  }
  return state;
};

export default TagsReducer;
