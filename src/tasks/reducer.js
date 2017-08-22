import { List, Record } from 'immutable'; // immmutable objects
import { SIGN_OUT_SUCCESS } from '../auth/action-types';

import {
  CREATE_TASK_SUCCESS,
  REMOVE_TASK_SUCCESS,
  FILTER_TASKS,
  LOAD_TASKS_SUCCESS,
  UPDATE_TASK_SUCCESS,
  ADD_TO_GROUP_SUCCESS,
  REMOVE_FROM_GROUP_SUCCESS
} from './action-types';

//Record which keeps the state of 
//the whole TODOList

export const TasksState = new Record ({
	deleted: null, // the last deleted task
	filter: '',
	list: new List(), // to keep this moment`s list
	previous: null, // to remember the previous list
});

// reducer is immutable
// so always created new TasksState
//checks whether this is not undelete
// if yes just returns the previous list
export function tasksReducer(state = new TasksState(), {payload, type}) {
	switch(type) {
		case CREATE_TASK_SUCCESS:
			return state.merge({ // ????
				deleted: null, 
				previous: null,
				list: state.deleted && state.deleted.key === payload.key ?
				state.previous : state.list.unshift(payload) // ???
			});

		case REMOVE_TASK_SUCCESS:
			return state.merge({
				deleted: payload,
				previous: state.list, // this moment`s list becomes previous
				list: state.list.filter(task => task.key !== payload.key)

			});


		//if some filtr exists returns this filter
		//otherwise returns nofilter
		case FILTER_TASKS:
			return state.set('filter', payload.filterType || '' );

		case LOAD_TASKS_SUCCESS:
			return state.set('list', new List(payload.reverse())); //in reversed order???

		case UPDATE_TASK_SUCCESS:
			return state.merge({
				deleted: null,
				previous: null,
				list: state.list.map(task => {
					return task.key === payload.key ? //??????????
					payload : task; // ???????????????????????????
				})
			});

		case ADD_TO_GROUP_SUCCESS: // ??????????????????????????????
			return state.merge({
				deleted: null,
				previous: null,
				list: state.list.map(task => {
					return task.key === payload.key ? //
					payload : task; // 
				})
			});

		case REMOVE_FROM_GROUP_SUCCESS: // ?????????????????????????
			return state.merge({
				deleted: null,
				previous: null,
				list: state.list.map(task => {
					return task.key === payload.key ? //
					payload : task; // 
				})
			});

		case SIGN_OUT_SUCCESS:
			return new TasksState(); //creates new empty Tasklist

		default:
			return state;
	}
}