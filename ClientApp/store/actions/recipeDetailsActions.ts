import { typeName, Action } from 'redux-typed';
import { fetch, addTask } from 'domain-task';
import { ActionCreator } from "../store";
import * as api from './api';

@typeName("recipeDetails_LoadingRecipeDetailsAction")
export class BeginLoadingRecipeDetailsAction extends Action {
    constructor(public id: string) {
        super();
    }
}
@typeName("recipeDetails_LoadedRecipeDetailsAction")
export class CompletedLoadingRecipeDetailsAction extends Action {
    constructor(public id: string, public recipe: IRecipeDetails) {
        super();
    }
}
@typeName("recipeDetails_ErrorLoadingRecipeDetailsAction")
export class ErrorLoadingRecipeDetailsAction extends Action {
    constructor(public id: string) {
        super();
    }
}

export const recipeDetailsActions = {
    loadRecipeDetails: (id:string): ActionCreator => (dispatch, getState) => {

        let fetchTask = api.getRecipe(id, dispatch);

        dispatch(new BeginLoadingRecipeDetailsAction(id));
    }
};