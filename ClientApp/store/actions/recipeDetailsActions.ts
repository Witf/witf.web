import { typeName, Action } from 'redux-typed';
import { fetch, addTask } from 'domain-task';
import { ActionCreator } from "../store";

@typeName("recipeDetails_LoadingRecipeDetailsAction")
export class LoadingRecipeDetailsAction extends Action {
    constructor(public id: string) {
        super();
    }
}
@typeName("recipeDetails_LoadedRecipeDetailsAction")
export class RecievedRecipeDetailsAction extends Action {
    constructor(public id: string, public recipie: IRecipieDetails) {
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
        dispatch(new LoadingRecipeDetailsAction(id));

        const fetchTask = fetch(`/api/recipe/${encodeURIComponent(id)}`)
            .then(response => response.json())
            .then((recipie: IRecipieDetails) => {
                dispatch(new RecievedRecipeDetailsAction(id, recipie));
            });

        addTask(fetchTask);
    }
};