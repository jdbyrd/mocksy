import { combineReducers } from 'redux';
import ProjectsReducer from './ProjectsReducer';

const reducer = combineReducers({
  projects: ProjectsReducer
});

export default reducer;
