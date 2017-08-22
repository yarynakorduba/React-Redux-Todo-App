//todo representation
import React, { Component } from 'react';
import { List } from 'immutable';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';

// import mui from 'material-ui';	

import './Todo.css';

export class Todo extends Component {

	constructor() {
		super(...arguments);


		this.state = {editing: false};

		this.edit = this.edit.bind(this); //why do we do it here ?
		this.remove = this.remove.bind(this);
		this.save = this.save.bind(this);
		this.stopEditing = this.stopEditing.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.toggleStatus = this.toggleStatus.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
	}



	edit() {
		this.setState({editing: true});
	}

	remove() {
		this.props.removeTask(this.props.task);   // ???????????????????????????
	}

	save(event) {
		if (this.state.editing) {
			const { task } = this.props; // ???take new task from props???
			const title = event.target.value.trim(); // take away the whitespaces

			if (title.length && title !==task.title) {
				this.props.updateTask(task, {title});
			}
			this.stopEditing();
		}
	}

	stopEditing() {
		this.setState({editing: false});
	}

	handleKeyUp(event) {
		if (event.keyCode === 27) {
			this.stopEditing();
		}
		if (event.keyCode === 13) {
			this.save(event);
		}

	}

	handleSelectChange(event) { // !!!!!!!!!!!!!!!!!!!!!!!
		const { task } = this.props;
		const groupId = event.target.value;
		if (groupId !== task.groupId) {
				// console.log("BLBLABLA" + groupId);
				this.props.updateTask(task, {groupId: groupId});
		}
		//console.log("handleChange groupId " + this.state.groupId);
	}

	toggleStatus() { //toggles from completed to not completed and vice versa
		const { task } = this.props;
		this.props.updateTask(task, { completed: !task.completed });
	}

	renderTitle(task) {
		return (
			<div 
			className="todo-item__title">
				{task.title}
			</div>
		);
	}


	renderTitleInput(task) {
		var groupLst = this.props.groups.map((group) => {
  
			return (
				<option key={group.key} value={group.key}>
				{group.title}
				</option>
				);
		});

		groupLst = groupLst.push(<option
				 key={0} value={0}>
				No Group
				</option>);
		console.log("taskGroup " + this.props.task.groupId);

		// var GroupSelected = groupLst.find(function(el){
		// 	return task.groupId === el.value;
		// });

		// console.log(GroupSelected);

		return (
			<div className="todo-item_inp">
			<input className="todo-item__input"
			autoComplete="on"
			autoFocus
			defaultValue={task.title}
			maxLength="33"
			onKeyUp={this.handleKeyUp}
			type="text"
			>
			</input>
			<div>
				<label>
					 <select value={this.props.task.groupId} 
					ref={e => this.groupselect = e } 
					onChange={this.handleSelectChange}>
					{groupLst}
					</select>
				</label>
				</div>
			</div>
			);
	
}

	render() {
		

		const { editing } = this.state;
		const { task } = this.props;

		let containerClasses = classNames('todo-item',{
			'todo-item--completed': task.completed,
			'todo-item--editing': task.editing
		});

		return (
			<div className={containerClasses} tabIndex="0">
			<div className="cell">
			<Button id="compl-btn" onClick={this.toggleStatus} // !!!!!!!!!
			className={classNames('task-item__button', 
				{'active': task.completed, 'hide': editing})}>
			COMPL
			</Button>
			</div>

			<div className="cell">
			{ editing ? this.renderTitleInput(task) : this.renderTitle(task) }
			</div>

			<div className="cell">
			<Button onClick={this.edit}
			className={classNames('task-item__button',
				{'hide': editing})}>
			UPD
			</Button>
			</div>

			<div className="cell">
			<Button onClick={this.stopEditing}
			className={classNames('task-item__button',
				{'hide': !editing})}>
			SAVE
			</Button>
			</div>

			<div className="cell">
			<Button onClick={this.remove}
			className={classNames('task-item__button',
				{'hide':editing})}>
			DEL
			</Button>
			</div>

			</div>

			);
	}
}


Todo.PropTypes = {
	removeTask: PropTypes.func.isRequired,
	updateTask: PropTypes.func.isRequired,
	task: PropTypes.object.isRequired,
	groups: PropTypes.instanceOf(List).isRequired
};



export default Todo;
