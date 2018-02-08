import { combineReducers } from 'redux';
import ProjectsReducer from './ProjectsReducer';
import FeedbackReducer from './FeedbackReducer';
import UserReducer from './UserReducer';
import AuthReducer from './AuthReducer';
import SortProjectsReducer from '/SortProjectsReducer';

const reducer = combineReducers({
  auth: AuthReducer,
  projects: ProjectsReducer,
  feedback: FeedbackReducer,
  user: UserReducer,
  sortProjectsBy: SortProjectsReducer,
});

export default reducer;
