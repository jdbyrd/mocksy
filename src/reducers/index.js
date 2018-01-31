import { combineReducers } from 'redux';
import ProjectsReducer from './ProjectsReducer';
import FeedbackReducer from './FeedbackReducer';
import UserReducer from './UserReducer';
import AuthReducer from './AuthReducer';
import TagsReducer from './TagsReducer';

const reducer = combineReducers({
  auth: AuthReducer,
  projects: ProjectsReducer,
  feedback: FeedbackReducer,
  user: UserReducer,
  tags: TagsReducer
});

export default reducer;
