import { typeName, Action } from 'redux-typed';
import { fetch, addTask } from 'domain-task';
import { ActionCreator } from "../index";

@typeName("RecipeSearch_QUERY_RECIPES")
export class QueryRecipesAction extends Action {
    constructor(public query: string) {
        super();
    }
}

@typeName("RecipeSearch_RECIEVED_RECIPIES_QUERY")
export class RecievedRecipiQueryAction extends Action {
    constructor(public query: string, public recipies: Recipie[]) {
        super();
    }
}

@typeName("RecipeSearch_QUERY_RECIPE_SEARCH_SUGGESTIONS")
export class QueryRecipeSearchSuggestionsAction extends Action {
    constructor(public query: string) {
        super();
    }
}

@typeName("RecipeSearch_RECIEVED_RECIPE_SEARCH_SUGGESTIONS")
export class RecievedRecipeSearchSuggestionsAction extends Action {
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
        let fetchTask = fetch(`/api/findRecipes?q=${q}`)
            .then(response => response.json())
            .then((data: { recipes: Recipie[], skipMarker: string }) => {
                dispatch(new RecievedRecipiQueryAction(q, data.recipes));
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch(new QueryRecipesAction(q));
    },
    querySuggestions: ({value}): ActionCreator => (dispatch, getState) => {
        let fetchTask = fetch(`/api/autocomplete?w=${value}`)
            .then(response => response.json())
            .then((data: ISearchSuggestion[]) => {
                dispatch(new RecievedRecipeSearchSuggestionsAction(value, data));
            });
        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch(new QueryRecipeSearchSuggestionsAction(value));
    },
    clearSuggestions: (): ActionCreator => (dispatch, getState) => {
        dispatch(new ClearRecipeSearchSuggestionsAction());
    }
};