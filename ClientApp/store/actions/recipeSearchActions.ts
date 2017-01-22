import { typeName, Action } from 'redux-typed';
import { fetch, addTask } from 'domain-task';
import { ActionCreator } from "../store";

@typeName("RecipeSearch_QUERY_RECIPES")
export class BeginQueryRecipesAction extends Action {
    constructor(public query: string) {
        super();
    }
}
@typeName("RecipeSearch_RECIEVED_RECIPES_QUERY")
export class CompletedQueryRecipesAction extends Action {
    constructor(public query: string, public recipies: IRecipe[]) {
        super();
    }
}
@typeName("RecipeSearch_QUERY_RECIPE_SEARCH_SUGGESTIONS")
export class BeginQueryRecipeSearchSuggestionsAction extends Action {
    constructor(public query: string) {
        super();
    }
}
@typeName("RecipeSearch_RECIEVED_RECIPE_SEARCH_SUGGESTIONS")
export class CompletedRecipeSearchSuggestionsAction extends Action {
    constructor(public query: string, public suggestions: ISearchSuggestion[]) {
        super();
    }
}
@typeName("RecipeSearch_CLEAR_RECIPE_SEARCH_SUGGESTIONS")
export class ClearRecipeSearchSuggestionsAction extends Action {
    constructor() {
        super();
    }
}

export const recipeSearchActions = {
    queryRecipies: (q: string): ActionCreator => (dispatch, getState) => {
        let fetchTask = fetch(`http://localhost:1234/api/findRecipes?q=${q}`)
        // let fetchTask = fetch(`http://witf.apphb.com/api/findRecipes?q=${q}`)
            .then(response => response.json())
            .then((data: { recipes: IRecipe[], skipMarker: string }) => {
                dispatch(new CompletedQueryRecipesAction(q, data.recipes));
            });

        dispatch(new BeginQueryRecipesAction(q));
    },
    querySuggestions: ({value}): ActionCreator => (dispatch, getState) => {
        let fetchTask = fetch(`http://localhost:1234/api/autocomplete?w=${value}`)
//        let fetchTask = fetch(`http://witf.apphb.com/api/autocomplete?w=${value}`)
            .then(response => response.json())
            .then((data: ISearchSuggestion[]) => {
                dispatch(new CompletedRecipeSearchSuggestionsAction(value, data));
            });

        dispatch(new BeginQueryRecipeSearchSuggestionsAction(value));
    },
    clearSuggestions: (): ActionCreator => (dispatch, getState) => {
        dispatch(new ClearRecipeSearchSuggestionsAction());
    }
};