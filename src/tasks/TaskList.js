//responsible for logic of the tasklist 
//helps to load to firebase
import { FirebaseList } from '../firebase';
import * as taskActions from './actions';
import { Task } from './Task';

export const taskList = new FirebaseList({
	onAdd: taskActions.createTaskSuccess,
	onLoad: taskActions.loadTasksSuccess,
	onChange: taskActions.updateTaskSuccess,
	onRemove: taskActions.removeTaskSuccess
}, Task);