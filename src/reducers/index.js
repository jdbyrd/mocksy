import { combineReducers } from 'redux';
import ProjectsReducer from './ProjectsReducer';
import FeedbackReducer from './FeedbackReducer';
import UserReducer from './UserReducer';
import AuthReducer from './AuthReducer';
import FilterKeyReducer from './FilterKeyReducer';
import SortKeyReducer from './SortKeyReducer';

const reducer = combineReducers({
  auth: AuthReducer,
  projects: ProjectsReducer,
  feedback: FeedbackReducer,
  user: UserReducer,
  filterKey: FilterKeyReducer,
  sortKey: SortKeyReducer,
});

export default reducer;
