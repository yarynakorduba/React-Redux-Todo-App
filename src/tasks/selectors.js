//this file helps with memoization to 
//avoid unnecessary rerunning of the function

import { createSelector } from 'reselect';

export function getTasks(state) {
	return state.tasks;
}

export function getTaskList(state) {
	return getTasks(state).list
}

export function getTaskFilter(state) {
	return getTasks(state).filter;
}

export function getDeletedTask(state) {
	return getTasks(state).deleted;
}


// =============Memoization in selectors=====================
//keeps track of the results of the function call so
//the function doesn`t have to run again if it was already called

export const getVisibleTasks = createSelector( //selector which helps to filter
	getTaskList,                              // the tasks by some value
	getTaskFilter,
	(tasks, filter) => {
		switch(filter) {
			case 'active':
				return tasks.filter(task => !task.completed);
			case 'completed':
				return tasks.filter(task => task.completed);
			default:                 //shows all the tasks
				return tasks;
		}
	}
	);