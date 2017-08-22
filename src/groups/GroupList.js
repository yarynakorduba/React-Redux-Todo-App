import { FirebaseList } from '../firebase';
import * as groupActions from './actions';
import { Group } from './Group';

export const groupList = new FirebaseList({
	onAdd: groupActions.createGroupSuccess,
	onLoad: groupActions.loadGroupsSuccess,
	onChange: groupActions.updateGroupSuccess,
	onRemove: groupActions.removeGroupSuccess
}, Group);
