import _ from 'lodash';
import Auth0Service from './Auth0Service';
import ApiService from './ApiService';
import {AsyncEvent} from 'ts-events';
import { userProfileActions } from "../store/actions/userProfileActions";

const auth0Service = new Auth0Service();
const apiService = new ApiService();

const bootstrap = () => {
    
    //TODO(mdog): Remove this. Pass in config.json instead.
    let config = {
                    "baseUrl": "http://witf.apphb.com/api",
                    "auth0": {
                        "clientID": "yLeZKxDw4KMFZhS8ZEQgNbsGoWE5BG98",
                        "domain": "witf.eu.auth0.com"
                    }
                };

    auth0Service.init(config.auth0);
    apiService.init(config.baseUrl);

    setApiTokens();

    auth0Service.profileChanged.attach(function(profile) {
        userProfileActions.update(profile);
        setApiTokens();
    });
};

const setApiTokens = () => {
    const token = auth0Service.getToken();
    apiService.setToken(token);
}

export {
    bootstrap as default,
    auth0Service,
    apiService
}