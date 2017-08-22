// todo input form
import React, { Component } from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
// import { getAllGroups } from '../../groups';


import './TodoForm.css';

export class TodoForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		groups: PropTypes.instanceOf(List).isRequired
	};

	constructor() {
		super(...arguments);
	

		this.state = {title: '',
		groupId: null}; // ?????????

		this.handleChange = this.handleChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
	}

	clearInput() {
		this.setState({title: '',
		/*groupId: null */});

	}

	handleSubmit(event) {
		event.preventDefault(); //default method is GET ----- ???????????????????
		const title = this.state.title.trim();
		const groupId = this.state.groupId;
		if (title.length) this.props.handleSubmit(title, groupId); //submits only if length != 0
		console.log("handleSubmit groupId " + this.state.groupId);

		this.clearInput();
	}

	handleChange(event) {
		this.setState({title: event.target.value //,
			//groupId: event.target.value
		}); //modifies title from the input
		//console.log("handleSelect " + group);
	}

	handleSelectChange(event) { // !!!!!!!!!!!!!!!!!!!!!!!
		this.setState({groupId: event.target.value});
		console.log("handleChange groupId " + this.state.groupId);
	}

	handleKeyUp(event) {  // why? 27 = esc
		if (event.keyCode === 27) this.clearInput();
		
	}



	componentWillReceiveProps(nextProps) {  // !!!!!!!!!!!!!!
		console.log("This" + nextProps.groups.size + " " + nextProps.groups);
		if (!this.state.groupId  &&  nextProps.groups && 
		 	nextProps.groups.size > 0 ) {

		//	console.log("This" + nextProps.groups[0].key);
			this.setState({groupId: 0});
			//this.groupselect.value = nextProps.groups.first();

		 }
	}

	render() {
		let groupLst = this.props.groups.map((group) => {
  
			return (
				<option
				 key={group.key} value={group.key}>
				{group.title}
				</option>
				);
});

		groupLst = groupLst.push(<option
				 key={0} value={0}>
				No Group
				</option>);

		console.log("In render" + this.props.groups);


		return ( //form shouldn't be validated on Submit
			<div>
			<form className="todo-form" onSubmit={this.handleSubmit} noValidate>
				<input 
				autoComplete="on" 
				onKeyUp={this.handleKeyUp}
				onChange={this.handleChange}
				placeholder="What do you need to do?"
				maxLength="33" 
				autoFocus 
				ref={e => this.titleInput = e} // ??????????????
				type="text"
				value={this.state.title}     // !!!!!!!!!
				className="todo-form__input" />

				<div>
				<label>
					
					<select
					ref={e => this.groupselect = e } 
					 // value={groupLst.first()}
					onChange={this.handleSelectChange}> 
					{groupLst}
					</select>
				</label>
				</div>

			</form>

			
			</div>
			);
	}
}

export default TodoForm;


