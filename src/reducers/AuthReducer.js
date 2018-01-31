const AuthReducer = (state = null, action) => {
  if (action.type === 'CHECK_AUTH') {
    console.log(action.payload);
    return action.payload;
  }
  return state;
};
export default AuthReducer;
