import { taskList } from './TaskList';
import { getDeletedTask } from './selectors';
import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  REMOVE_TASK_ERROR,
  REMOVE_TASK_SUCCESS,
  FILTER_TASKS,
  LOAD_TASKS_SUCCESS,
  UNDELETE_TASK_ERROR,
  UNLOAD_TASKS_SUCCESS,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS,
  ADD_TO_GROUP_SUCCESS,
  ADD_TO_GROUP_ERROR,
  REMOVE_FROM_GROUP_SUCCESS,
  REMOVE_FROM_GROUP_ERROR
} from './action-types';


export function createTask(title, groupId) {
	return dispatch => {
		taskList.push({completed: false, title, groupId})
		.catch(error => dispatch(createTaskError(error)));
	}

}

export function createTaskError(error) {
	return {
		type: CREATE_TASK_ERROR,
		payload: error
	};
}

export function createTaskSuccess(task) {
	return {
		type: CREATE_TASK_SUCCESS,
		payload: task
	}
}

export function filterTasks(filterType) {
	return {
		type: FILTER_TASKS,
		payload: { filterType }
	};
}

export function removeTask(task) {
	return dispatch => {
			taskList.remove(task.key)
			.catch(error => dispatch(removeTaskError(error)));
	};
}

export function removeTaskError(error) {
	return {
		type: REMOVE_TASK_ERROR,
		payload: error
	};
}

export function removeTaskSuccess(task) {
	return {
		type: REMOVE_TASK_SUCCESS,
		payload: task
	};
}

export function undeleteTask() {
	return (dispatch, getState) => {
		const task = getDeletedTask(getState()); //finds that task by the state
		if (task) { //one more time adds it to the tasklist
			taskList.set(task.key, {completed: task.completed, title: task.title})
			.catch(error => dispatch(undeleteTaskError(error)));
		}
	};
}

export function undeleteTaskError(error) {
	return {
		type: UNDELETE_TASK_ERROR,
		payload: error
	};
}

export function updateTask(task, changes) {
	return dispatch => {
		taskList.update(task.key, changes)
		.catch(error => dispatch(updateTaskError(error)));
	};	
}

export function updateTaskSuccess(task) {
	return {
		type: UPDATE_TASK_SUCCESS,
		payload: task
	};
}

export function updateTaskError(error) {
	return {
		type: UPDATE_TASK_ERROR,
		payload: error
	};
}


export function loadTasks() {        //loads tasks of specific user
	return (dispatch, getState) => {
		const { auth } = getState();
		taskList.path = `tasks/${ auth.id }`; //path with user identificated
		taskList.subscribe(dispatch); //subscribes and calls dispatch 
	};    //in response to user`s actions
}

export function loadTasksSuccess(tasks) {
	return {
		type: LOAD_TASKS_SUCCESS,
		payload: tasks
	};
}

export function unloadTasks() { // unsubscribes from the listener of the state 
	taskList.unsubscribe();     //to stop tracking one user`s task
	return {				//when he signs out
		type: UNLOAD_TASKS_SUCCESS
	};
}


export function addToGroup(task, groupId) { // ??????????????????????????????
	return dispatch => {
		taskList.update(task.key, groupId)
		.catch(error => dispatch(updateTaskError(error)));
	};
}

export function addToGroupSuccess(task) { // ????????????????????????
	return {
		type: ADD_TO_GROUP_SUCCESS,
		payload: task
	};
}

export function addToGroupError(error) {
	return {
		type: ADD_TO_GROUP_ERROR,
		payload: error
	};
}

export function removeFromGroup(task, groupId) { // ????????????????????????????
	return dispatch => {
		taskList.update(task.key, groupId)
		.catch(error => dispatch(updateTaskError(error)));
	};
}

export function removeFromGoupSuccess(task) {
	return {
		type: REMOVE_FROM_GROUP_SUCCESS,
		payload: task
	};
}

export function removeFromGroupError(error) {
	return {
		type: REMOVE_FROM_GROUP_ERROR,
		payload: error
	};
}