import { combineReducers } from 'redux';
import ProjectsReducer from './ProjectsReducer';
import FeedbackReducer from './FeedbackReducer';
import UserReducer from './UserReducer';
import AuthReducer from './AuthReducer';
import FilterProjectsReducer from './FilterProjectsReducer';

const reducer = combineReducers({
  auth: AuthReducer,
  projects: ProjectsReducer,
  feedback: FeedbackReducer,
  user: UserReducer,
  filterProjects: FilterProjectsReducer,
});

export default reducer;
