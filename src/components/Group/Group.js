//group representation
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';

// import mui from 'material-ui';	

import './Group.css';

export default class Group extends Component {

	constructor() {
		super(...arguments);


		this.state = {editing: false,
			shared: ''};

		this.edit = this.edit.bind(this); //why do we do it here ?
		this.remove = this.remove.bind(this);
		this.save = this.save.bind(this);
		this.stopEditing = this.stopEditing.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.shareWith = this.shareWith.bind(this);
		this.handleShare = this.handleShare.bind(this);
	}


	edit() {
		this.setState({editing: true});
	}

	remove() {
		this.props.removeGroup(this.props.group);   // ???????????????????????????
	}

	save(event) {
		if (this.state.editing) {
			const { group } = this.props; // ???take new group from props???
			const title = event.target.value.trim(); // take away the whitespaces
			if (title.length && title !==group.title) {
				this.props.updateGroup(group, {title});
			}
			this.stopEditing();
		}
	}

	handleShare(event) {

		if (event.keyCode === 27) { //esc
			this.stopEditing();
		}
		if (event.keyCode === 13) { //Enter
			const { group } = this.props;
			const { shared } = this.state.shared;
			if (shared.length) {
				this.props.updateGroup(group, {shared});
			}

		}
	}

	shareWith() {
		return (
			<input className="group-item__shared"
			autoComplete="on"
			autoFocus
			defaultValue={this.state.shared}
			maxLength="75"
			onKeyUp={this.handleShare}
			type="text"
			>
			</input>
			);
	}

	stopEditing() {
		this.setState({editing: false});
	}

	handleKeyUp(event) {
		if (event.keyCode === 27) { //esc
			this.stopEditing();
		}
		if (event.keyCode === 13) { //Enter
			this.save(event);
		}

	}




	renderTitle(group) {
		return (
			<div 
			className="group-item__title">
				{group.title}
			</div>
		);
	}

	renderTitleInput(group) {
		return (
			<input className="group-item__input"
			autoComplete="on"
			autoFocus
			defaultValue={group.title}
			maxLength="75"
			onKeyUp={this.handleKeyUp}
			type="text"
			>
			</input>
			);
	}

	render() {
		const { editing } = this.state.editing;

		const { group } = this.props;

		let containerClasses = classNames('group-item',{
			'group-item--editing': group.editing
		});

		return (
			<div className={containerClasses} tabIndex="0">
			<div className="cell">
			{ editing ? this.renderTitleInput(group) : this.renderTitle(group) }
			
			</div>

			<div className="cell">
			<Button onClick={this.edit}
			className={classNames('group-item__button',
				{'hide': editing})}>
			UPD
			</Button>
			</div>

			<div className="cell">
			<Button onClick={this.stopEditing}
			className={classNames('group-item__button',
				{'hide': !editing})}>
			STOP
			</Button>
			</div>

			<div className="cell">
			<Button onClick={this.remove}
			className={classNames('group-item__button',
				{'hide':editing})}>
			DEL
			</Button>
			</div>

			<div className="cell">
			<Button onClick={this.shareWith()}
			className={classNames('group-item__button',
				{'hide':editing})}>
			SHARE
			</Button>
			</div>

			</div>

			);
	}
}


Group.PropTypes = {
	removeGroup: PropTypes.func.isRequired,
	updateGroup: PropTypes.func.isRequired,
	group: PropTypes.object.isRequired
};



