// tgroup input form
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './GroupForm.css';

export class GroupForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired
	};

	constructor() {
		super(...arguments);
	

		this.state = {title: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	clearInput() {
		this.setState({title: ''});
	}

	handleSubmit(event) {
		event.preventDefault(); //default method is GET ----- 
		const title = this.state.title.trim();
		if (title.length) this.props.handleSubmit(title); //submits only if length != 0
		this.clearInput();
	}

	handleChange(event) {
		this.setState({title: event.target.value}); //modifies title from the input
	}

	handleKeyUp(event) {  // why ??????????????
		if (event.keyCode === 27) this.clearInput();
	}


	render() {

		return ( //form shouldn't be validated on Submit
			<form className="group-form" onSubmit={this.handleSubmit} noValidate>
				<input 
				autoComplete="on" 
				onKeyUp={this.handleKeyUp}
				onChange={this.handleChange}
				placeholder="Create group"
				maxLength="25" 
				autoFocus 
				ref={e => this.titleInput = e} // ??????????????
				type="text"
				value={this.state.title}     // !!!!!!!!!
				className="group-form__input" />
			</form>
			);
	}
}

export default GroupForm;