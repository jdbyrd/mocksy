const AuthReducer = (state = false, action) => {
  if (action.type === 'CHECK_AUTH') {
    return action.payload;
  }
  return state;
};
export default AuthReducer;
