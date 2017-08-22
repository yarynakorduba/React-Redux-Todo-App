import React, { Component } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import { groupsActions, getAllGroups } from './groups';
import { getTaskFilter, getVisibleTasks, tasksActions } from './tasks';
//import TodoForm from './components/TodoForm';
//import TodoList from './components/TodoList';
import GroupForm from './components/GroupForm';
import GroupList from './components/GroupList';

//////////////////////////////////////////////////////////

export class GroupsPageViews extends Component { // CHECK!!!
	static propTypes = {
		createGroup: PropTypes.func.isRequired,
		removeGroup: PropTypes.func.isRequired,
		updateGroup: PropTypes.func.isRequired,
		loadGroups: PropTypes.func.isRequired,
		unloadGroups: PropTypes.func.isRequired,
		groups: PropTypes.instanceOf(List).isRequired, //,
		location: PropTypes.object.isRequired, // ??????????????????
		createTask: PropTypes.func.isRequired,
		undeleteTask: PropTypes.func.isRequired,
		removeTask: PropTypes.func.isRequired,
		updateTask: PropTypes.func.isRequired,
		loadTasks: PropTypes.func.isRequired,
		unloadTasks: PropTypes.func.isRequired,
		tasks: PropTypes.instanceOf(List).isRequired,
		filterTasks: PropTypes.func.isRequired,
		filterType: PropTypes.string.isRequired,
	};


	// exists to put some logic before component mounts
	componentWillMount() { 
		this.props.loadGroups(); //prepares groups 
		
		//this.props.loadTasks(); //prepares tasks by filter parameter 
		// this.props.filterTasks(
		// this.getFilterParam(this.props.location.search)
		// ); //before mounting occurs
	}							//before mounting occurs


	componentWillUnmount() { //invoked immediately after 
		this.props.unloadGroups(); // a component is mounted
		// this.props.unloadTasks();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search !== this.props.location.search) {
			// this.props.filterTasks(
			// 	this.getFilterParam(nextProps.location.search));
		}		
	}

	//helps with understanding the filter
	// getFilterParam(search) {
	// 	const params = new URLSearchParams(search);
	// 	return params.get('filter');
	// }

	render() { //this.props.createGroup goes from groups/actions
		return (
			<div className="g-row">
				<div className="g-col"> 
					<GroupForm handleSubmit={this.props.createGroup} /> 
				</div>

				<div className="g-col">
					<GroupList 
					updateGroup={this.props.updateGroup}
					removeGroup={this.props.removeGroup}
					groups={this.props.groups} 
					tasks={this.props.tasks}
					updateTask={this.props.updateTask}
					removeTask={this.props.removeTask}
					/>

				</div>
			</div>);
	}
}


//==============================CONNECT==================================


// helpful to define which part of redux store 
// you want to expose on your component
const mapStateToProps = createSelector( // ?????????
	getAllGroups,
	getTaskFilter,
	getVisibleTasks,
	(groups, filterType, tasks) => ({
		groups,
		filterType,
		tasks
	})
);


// helpfup to define what actions
// we want to expose as props
//creates new Object
const mapDispatchToProps = Object.assign(
	{},
	groupsActions,
	tasksActions
);

export default connect (
	mapStateToProps,
	mapDispatchToProps
)(GroupsPageViews);
