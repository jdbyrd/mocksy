import { combineReducers } from 'redux';
import ProjectsReducer from './ProjectsReducer';
import FeedbackReducer from './FeedbackReducer';

const reducer = combineReducers({
  projects: ProjectsReducer,
  feedbackItems: FeedbackReducer
});

export default reducer;
