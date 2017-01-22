import { typeName, Action } from 'redux-typed';
import { fetch, addTask } from 'domain-task';
import { ActionCreator } from "../store";

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

        // const fetchTask = fetch(`http://witf.apphb.com/api/recipe/${encodeURIComponent(id)}`)
        const fetchTask = fetch(`http://localhost:1234/api/recipe/${encodeURIComponent(id)}`)
            .then(response => response.json())
            .then((recipe: IRecipeDetails) => {
                dispatch(new CompletedLoadingRecipeDetailsAction(id, recipe));
            });

        dispatch(new BeginLoadingRecipeDetailsAction(id));
    }
};