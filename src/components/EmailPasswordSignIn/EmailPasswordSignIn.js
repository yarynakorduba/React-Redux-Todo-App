import React, { Component } from 'react';
// import { List } from 'immutable';
import PropTypes from 'prop-types';

import './EmailPasswordSignIn.css';



//=================================

export class EmailPasswordSignIn extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired		
	//	email: PropTypes.string.isRequired,
	//	password: PropTypes.string.isRequired
	};

	constructor() {
		super(...arguments);
		this.state = {
			email: '',
			password: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.clearInput = this.clearInput.bind(this);
		this.handleEmailKeyUp = this.handleEmailKeyUp.bind(this);
		this.handlePasswordKeyUp = this.handlePasswordKeyUp.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);

	}


	clearInput() {
		this.setState({email: '',
		password: ''});

	}

	handleEmailKeyUp(event) {  // why? 27 = esc
		if (event.keyCode === 27) this.clearInput();
		if (event.keyCode === 13) this.passwordInput.focus();
	}

	handlePasswordKeyUp(event) {
		if (event.keyCode === 27) this.clearInput();
		if (event.keyCode === 13) this.handleSubmit();
	}

	handleEmailChange(event) {
		this.setState({email: event.target.value});
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}


	handleSubmit(event) {
		//event.preventDefault(); //default method is GET ----- ???????????????????
		const email = this.state.email.trim();
		const password = this.state.password.trim();
		console.log("HANDLE SUBMIT");
		if (email.length && password.length) 
		this.props.handleSubmit(email, password); //CHANGE THIS
		console.log("handleSubmit email+password"
		 + this.state.email
		 + this.state.password);

		this.clearInput();
	}

	render() {
		return(
			<div className="email-password">
			<form className="email-password-form"
			onSubmit={this.handleSubmit}>

				<input className="email-form__input"
				value={this.state.email}
				placeholder="Enter your email"
				onKeyUp={this.handleEmailKeyUp} 
				onChange={this.handleEmailChange} 
				ref={e => this.emailInput = e}/>

				<input className="password-form__input"
				value={this.state.password}
				placeholder="Enter your password"
				onKeyUp={this.handlePasswordKeyUp} 
				onChange={this.handlePasswordChange}
				ref={e => this.passwordInput = e} />
			</form>
			</div>
			);
	}


}



export default EmailPasswordSignIn;