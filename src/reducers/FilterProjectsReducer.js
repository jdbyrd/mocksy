const FilterProjectsReducer = (state = null, action) => {
  if (action.type === 'SORT_BY') {
    return action.payload;
  }
  return state;
};
export default FilterProjectsReducer;
