import { typeName, Action } from 'redux-typed';
import { ActionCreator } from "../store";

@typeName("UserProfile_UPDATE")
export class UpdateUserProfileAction extends Action {
    constructor(public userProfile: any) {
        super();
    }
}

export const userProfileActions = {
    update: (userProfile: any) : ActionCreator => (dispatch, getState) => {
        dispatch(new UpdateUserProfileAction(userProfile));
    }
};