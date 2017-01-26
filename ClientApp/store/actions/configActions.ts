/*
import { typeName, Action } from 'redux-typed';
import { fetch, addTask } from 'domain-task';
import { ActionCreator } from "../store";

@typeName("Config_FETCH")
export class FetchConfigAction extends Action {
    constructor() {
        super();
    }
}

export const configActions = {
    fetch: (): ActionCreator => (dispatch, getState) => {
        let fetchTask = fetch('../../config/config.json').then(res => res.json());

        dispatch(new FetchConfigAction());
    }
};*/