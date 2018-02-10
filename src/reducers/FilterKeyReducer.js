const FilterKeyReducer = (state = null, action) => {
  if (action.type === 'FILTER') {
    return action.payload;
  }
  return state;
};
export default FilterKeyReducer;
