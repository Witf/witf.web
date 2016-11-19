import { fetch, addTask } from 'domain-task';
import { typeName, isActionType, Action, Reducer } from 'redux-typed';
import { ActionCreator } from "./index";

@typeName("QUERY_RECIPES")
class QueryRecipesAction extends Action {
    constructor(public query: string) {
        super();
    }
}

@typeName("RECIEVED_RECIPIES_QUERY")
class RecievedRecipiQueryAction extends Action {
    constructor(public query: string, public recipies: Recipie[]) {
        super();
    }
}

@typeName("QUERY_RECIPE_SEARCH_SUGGESTIONS")
class QueryRecipeSearchSuggestionsAction extends Action {
    constructor(public query: string) {
        super();
    }
}

@typeName("RECIEVED_RECIPE_SEARCH_SUGGESTIONS")
class RecievedRecipeSearchSuggestionsAction extends Action {
    constructor(public query: string, public suggestions: ISearchSuggestion[]) {
        super();
    }
}

@typeName("CLEAR_RECIPE_SEARCH_SUGGESTIONS")
class ClearRecipeSearchSuggestionsAction extends Action {
    constructor() {
        super();
    }
}

export const actionCreators = {
    queryRecipies: (q: string): ActionCreator => (dispatch, getState) => {
        let fetchTask = fetch(`/api/findRecipes?q=${q}`)
            .then(response => response.json())
            .then((data: { recipes: Recipie[], skipMarker:string}) => {
                dispatch(new RecievedRecipiQueryAction(q, data.recipes));
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch(new QueryRecipesAction(q));
    },
    querySuggestions: ({value}): ActionCreator => (dispatch, getState) => {
        let fetchTask = fetch(`/api/autocomplete?w=${value}`)
            .then(response => response.json())
            .then((data:ISearchSuggestion[]) => {
                dispatch(new RecievedRecipeSearchSuggestionsAction(value, data));
            });
        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch(new QueryRecipeSearchSuggestionsAction(value));
    },
    clearSuggestions: (): ActionCreator => (dispatch, getState) => {
        dispatch(new ClearRecipeSearchSuggestionsAction());
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
const unloadedState: IRecipeSearchsState = {
    isLoading: false,
    suggestions: [],
    queryResults: [],
    currentQuery:""
};

export const reducer: Reducer<IRecipeSearchsState> = (state, action) => {
    if (isActionType(action, QueryRecipesAction)) {
        return {
            suggestions: state.suggestions,
            currentQuery: action.query,
            isLoading: true,
            queryResults: state.queryResults
        };
    } 
    if (isActionType(action, RecievedRecipiQueryAction)) {
        return {
            suggestions: state.suggestions,
            currentQuery:
            state.currentQuery,
            isLoading: false,
            queryResults: action.recipies
        };
    } 
    
    if (isActionType(action, RecievedRecipeSearchSuggestionsAction)) {
        return {
            suggestions: action.suggestions,
            currentQuery: state.currentQuery,
            isLoading: state.isLoading,
            queryResults: state.queryResults
        };
    } 

    if (isActionType(action, ClearRecipeSearchSuggestionsAction)) {
        return {
            suggestions: [],
            currentQuery: state.currentQuery,
            isLoading: state.isLoading,
            queryResults: state.queryResults
        };
    } 
    return state || unloadedState;
};