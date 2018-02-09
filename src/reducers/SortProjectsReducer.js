const SortProjectsReducer = (state = null, action) => {
  if (action.type === 'SORT') {
    return action.payload;
  }
  return state;
};
export default SortProjectsReducer;
