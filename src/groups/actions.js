import { groupList } from './GroupList';
import {
	CREATE_GROUP_ERROR,
	CREATE_GROUP_SUCCESS,
	REMOVE_GROUP_ERROR,
	REMOVE_GROUP_SUCCESS,
	LOAD_GROUPS_SUCCESS, 
	UNLOAD_GROUPS_SUCCESS,
	UPDATE_GROUP_ERROR,
	UPDATE_GROUP_SUCCESS	
} from './action-types';

export function loadGroups() {        //loads tasks of specific user
	return (dispatch, getState) => {
		const { auth } = getState();
		groupList.path = `groups/${ auth.id }`; //path with user identificated
		groupList.subscribe(dispatch); //subscribes and calls dispatch 
	};    //in response to user`s actions
}

export function loadGroupsSuccess(groups) {
	return {
		type: LOAD_GROUPS_SUCCESS,
		payload: groups
	};
}

export function unloadGroups() { // unsubscribes from the listener of the state 
	groupList.unsubscribe();     //to stop tracking one user`s task
	return {				//when he signs out
		type: UNLOAD_GROUPS_SUCCESS
	};
}


export function createGroup(group) {
	return dispatch => {
		groupList.push({title: group})
		.catch(error => dispatch(createGroupError(error)));
	}
}


export function createGroupSuccess(group) {
	return {
		type: CREATE_GROUP_SUCCESS,
		payload: group
	};
}

export function createGroupError(error) {
	return {
		type: CREATE_GROUP_ERROR,
		payload: error
	};
}

export function removeGroup(group) {
	return dispatch => {
		groupList.remove(group.key)
		.catch(error => dispatch(removeGroupError(error)));
	};
}

export function removeGroupSuccess(group) {
	return {
		type: REMOVE_GROUP_SUCCESS,
		payload: group
	};
}

export function removeGroupError(error) {
	return {
		type: REMOVE_GROUP_ERROR,
		payload: error
	};
}

export function updateGroup(group, changes) {
	return dispatch => {
		groupList.update(group.key, changes)
		.catch(error => dispatch(updateGroupError(error)));
	};	
}

export function updateGroupSuccess(group) {
	return {
		type: UPDATE_GROUP_SUCCESS,
		payload: group
	};
}

export function updateGroupError(error) {
	return {
		type: UPDATE_GROUP_ERROR,
		payload: error
	};
}
