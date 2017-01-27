import { isActionType, Reducer } from 'redux-typed';
import * as Actions from "../actions/userProfileActions";

const unloadedState: IUserProfileState = {name: null, picture: null};

export const userProfileReducer: Reducer<IUserProfileState> = (state, action) => {
    if (isActionType(action, Actions.UpdateUserProfileAction)) {
        return {
            name: action.userProfile.name,
            picture: action.userProfile.picture
        };
    }    

    return state || unloadedState;
};