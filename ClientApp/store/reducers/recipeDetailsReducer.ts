﻿import { isActionType, Reducer } from 'redux-typed';
import * as Actions from "../actions/recipeDetailsActions";

const unloadedState: IRecipeDetailsState = {};

function init(id: string, state: IRecipeDetailsState) {
    if (!!state[id]) {
        state[id] = { data: null, error: false, loading: false };
        return Object.assign({}, state);
    }
    return state;
}

function update(id: string, state: IRecipeDetailsState, newObject: IEntityMeta<IRecipeDetails>) {
    init(id, state);
    state[id] = Object.assign({}, state[id], newObject);
    return Object.assign({}, state);
}

export const recipeDetailsReducer: Reducer<IRecipeDetailsState> = (state, action) => {
    if (isActionType(action, Actions.BeginLoadingRecipeDetailsAction)) {
        state = update(action.id, state, { loading: true });
        return state;
    }

    if (isActionType(action, Actions.ErrorLoadingRecipeDetailsAction)) {
        state = update(action.id, state, { loading: false });
        return state;
    }

    if (isActionType(action, Actions.CompletedLoadingRecipeDetailsAction)) {
        state = update(action.id, state, {data: action.recipe, loading: false });
        return state;
    }

    return state || unloadedState;
};