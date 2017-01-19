import * as jwt_decode from "jwt-decode";
import Auth0Lock from "auth0-lock";
import {AsyncEvent} from 'ts-events';
import { isTokenExpired } from "./AuthHelpers";

const lockOptions = {
	auth: {
		params: { scope: 'openid name' }
	}
};

export class Auth0Service {
	private clientID: string;
	private lock: any;

	public profileChanged = new AsyncEvent<any>();

	_doAuthentication(authResult) {
		this.setToken(authResult.idToken);
		
		this.lock.getProfile(authResult.idToken, (error, profile) => {
			if (!error) {
				this.setProfile(profile);
			}
		});
	}

    init({ clientID, domain }) {
        this.clientID = clientID;
		this.lock =  new Auth0Lock(clientID, domain, lockOptions);
		this.lock.on('authenticated', this._doAuthentication.bind(this));
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
    }

	login() {
		this.lock.show();
	}

	loggedIn() {
		const token = this.getToken();
		return !!token && !isTokenExpired(token);
	}

	setToken(idToken) {
		localStorage.setItem('id_token', idToken);
	}

	getToken() {
		return localStorage.getItem('id_token');
	}

	setProfile(profile) {
		localStorage.setItem('profile', JSON.stringify(profile));
		this.profileChanged.post(profile);
	}

	getProfile() {
		const profile = localStorage.getItem('profile');
		return profile ? JSON.parse(profile) : {}
	}

	logout() {
		localStorage.removeItem('id_token');
		localStorage.removeItem('profile');
		this.profileChanged.post({});
	}
}

export default Auth0Service;