import _ from 'lodash';
import f from 'isomorphic-fetch';

export const name = 'witf/config';
export const FETCH_REQUEST = `${name}/fetch/request`;

export const fetch = () => ({
    type: FETCH_REQUEST,
    apiCall: () => f('config/config.json').then(res => res.json()),
    predicate: state => _.isEmpty(state.config)
});

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

        addTask(fetchTask);
        dispatch(new FetchConfigAction());
    }
};*/