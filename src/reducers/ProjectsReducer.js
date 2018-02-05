const ProjectsReducer = (state = [], action) => {
  if (action.type === 'POPULATE_FEED') {
    return action.payload;
  }
  return state;
};

export default ProjectsReducer;
