import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from '../auth';
import { tasksReducer } from '../tasks'
import { groupsReducer } from '../groups';

export default combineReducers({
	auth: authReducer,
	routing: routerReducer,
	tasks: tasksReducer,
	groups: groupsReducer	
});

// export default todoApp;