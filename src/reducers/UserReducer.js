const UserReducer = (state = [], action) => {
  if (action.type === 'POPULATE_USER') {
    return action.payload;
  }
  return state;
};
export default UserReducer;
