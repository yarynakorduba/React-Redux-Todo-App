import { List, Record } from 'immutable';
import { SIGN_OUT_SUCCESS } from '../auth/action-types';

import {
	CREATE_GROUP_SUCCESS,
	REMOVE_GROUP_SUCCESS,
	LOAD_GROUPS_SUCCESS,
	UPDATE_GROUP_SUCCESS
} from './action-types';

export const GroupsState = new Record({
	deleted: null,  // the last deleted group
	list: new List(), // this moment`s grouplist
	previous: null // to rememebr the previous grouplist
});

export function groupsReducer(state = new GroupsState(), {payload, type}) {
	switch(type) {


		case CREATE_GROUP_SUCCESS:
			return state.merge({ // ????
				deleted: null, 
				previous: null,
				list: state.deleted && state.deleted.key === payload.key ?
				state.previous : state.list.unshift(payload) // ???
			});


		case REMOVE_GROUP_SUCCESS:
			return state.merge({
				deleted: payload,
				previous: state.list, // this moment`s list becomes previous
				list: state.list.filter(group => group.key !== payload.key)
			});


		case LOAD_GROUPS_SUCCESS:
			return state.set('list', new List(payload.reverse())); //in reversed order? 
			


		case UPDATE_GROUP_SUCCESS:
			return state.merge({
				deleted: null,
				previous: null,
				list: state.list.map(group => {
					return group.key === payload.key ? //??????????
					payload : group; // ???????????????????????????
				})
			});
			

		case SIGN_OUT_SUCCESS:
			return new GroupsState(); //creates new empty GroupList


		default:
			return state;
	}


}