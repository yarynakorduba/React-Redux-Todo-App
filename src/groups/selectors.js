	//this file helps with memoization to 
//avoid unnecessary rerunning of the function

import { createSelector } from 'reselect';

export function getGroups(state) {
	return state.groups;
}

export function getGroupList(state) {
	return getGroups(state).list
}

export function getDeletedGroup(state) {
	return getGroups(state).deleted;
}


export const getAllGroups = createSelector( //selector which helps to filter
	getGroupList,                              // the tasks by some value
	(groups) => {
                 //shows all the groups
			return groups;
		}
	);