const FilterProjectsReducer = (state = 'all', action) => {
  if (action.type === 'SORT_BY') {
    return action.payload;
  }
  return state;
};
export default FilterProjectsReducer;
