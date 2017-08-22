import { Record } from 'immutable';
import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from './action-types';

export const AuthState = new Record({ 
	authenticated: false,
	id: null
});


export function authReducer(state = new AuthState(), {payload, type}) {
	switch(type) {
		case INIT_AUTH:
		case SIGN_IN_SUCCESS:
			console.log("Reducer" + state.authenticated + " " + payload);
			return state.merge({
				authenticated: !!payload,
				id: payload ? payload.uid : null
			});

		case SIGN_OUT_SUCCESS:
			return new AuthState(); //available for sign in

		default:
			return state;
	}
}
