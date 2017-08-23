import React, { Component } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import { getTaskFilter, getVisibleTasks, tasksActions } from './tasks';
import { groupsActions, getAllGroups } from './groups';
import Footer from './components/Footer';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import GroupsPageViews from './GroupsPageViews';


import './index.css';
//////////////////////////////////////////////////////////

export class TasksPageViews extends Component {
	static propTypes = {
		createTask: PropTypes.func.isRequired,
		undeleteTask: PropTypes.func.isRequired,
		removeTask: PropTypes.func.isRequired,
		updateTask: PropTypes.func.isRequired,
		loadTasks: PropTypes.func.isRequired,
		unloadTasks: PropTypes.func.isRequired,
		tasks: PropTypes.instanceOf(List).isRequired,
		filterTasks: PropTypes.func.isRequired,
		filterType: PropTypes.string.isRequired,
		location: PropTypes.object.isRequired,
		groups: PropTypes.instanceOf(List).isRequired //,

	};


	// exists to put some logic before component mounts
	componentWillMount() { 
		this.props.loadTasks(); //prepares tasks by filter parameter 
		this.props.filterTasks(
		this.getFilterParam(this.props.location.search)
		); //before mounting occurs
	}

	componentWillUnmount() { //invoked immediately after 
		this.props.unloadTasks(); // a component is mounted
	}

	//maybe for loading the  filtered tasks of the new user???
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search !== this.props.location.search) {
			this.props.filterTasks(
				this.getFilterParam(nextProps.location.search));
		}
	}

	//helps with understanding the filter
	getFilterParam(search) {
		const params = new URLSearchParams(search);
		return params.get('filter');
	}

	render() { //this.props.createTask goes from tasks/actions
		//const groups = this.state.getGroupList();
		return (
			<div className="main-task-view">
			<div className="g-row">
				<div className="g-col"> 	
					<TodoForm handleSubmit={this.props.createTask} 
					groups={ this.props.groups }/> 
				</div>

				<div className="g-col">
					<Footer filter={this.props.filterType} />
					<TodoList 
					updateTask={this.props.updateTask}
					removeTask={this.props.removeTask}
					tasks={this.props.tasks} 
					groups={ this.props.groups }/>
				</div>
				
			</div>
			<div className="g-row">
				<div className="g-col-groups">
					<GroupsPageViews tasks={this.props.tasks}
					updateTask={this.props.updateTask}
					removeTask={this.props.removeTask}
					location={this.props.location} />
				</div>
			</div>
			</div>);
	}
}


//==============================CONNECT==================================


// helpful to define which part of redux store 
// you want to expose on your component
const mapStateToProps = createSelector(
	getTaskFilter,
	getVisibleTasks,
	getAllGroups,
	(filterType, tasks, groups) => ({
		filterType,
		tasks,
		groups
			})
);


// helpfup to define what actions
// we want to expose as props
const mapDispatchToProps = Object.assign(
	{},
	tasksActions,
	groupsActions
);

export default connect (
	mapStateToProps,
	mapDispatchToProps
)(TasksPageViews);
