const SortKeyReducer = (state = 'chron', action) => {
  if (action.type === 'SORT') {
    return action.payload;
  }
  return state;
};
export default SortKeyReducer;
