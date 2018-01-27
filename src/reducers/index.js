import { combineReducers } from 'redux';
import ProjectsReducer from './ProjectsReducer';
import FeedbackReducer from './FeedbackReducer';

const reducer = combineReducers({
  projects: ProjectsReducer,
  feedback: FeedbackReducer
});

export default reducer;
