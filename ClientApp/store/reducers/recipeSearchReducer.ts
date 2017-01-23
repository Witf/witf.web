import { isActionType, Reducer } from 'redux-typed';
import * as Actions from "../actions/recipeSearchActions";

const unloadedState: IRecipeSearchsState = {
    isLoading: false,
    suggestions: [],
    queryResults: [],
    currentQuery: "",
    currentSkipMarker: ""
};

export const recipeSearchReducer: Reducer<IRecipeSearchsState> = (state, action) => {
    if (isActionType(action, Actions.BeginQueryRecipesAction)) {
        return {
            isLoading: true,
            suggestions: state.suggestions,
            queryResults: state.queryResults,
            currentQuery: action.query,
            currentSkipMarker: action.skipMarker
        };
    }
    if (isActionType(action, Actions.CompletedQueryRecipesAction)) {
        return {
            isLoading: false,
            suggestions: state.suggestions,
            queryResults: state.currentSkipMarker ? state.queryResults.concat(action.recipies) : action.recipies,
            currentQuery: state.currentQuery,
            currentSkipMarker: action.skipMarker
        };
    }
    if (isActionType(action, Actions.CompletedRecipeSearchSuggestionsAction)) {
        return {
            isLoading: state.isLoading,
            suggestions: action.suggestions,
            queryResults: state.queryResults,
            currentQuery: state.currentQuery,
            currentSkipMarker: state.currentSkipMarker
        };
    }
    if (isActionType(action, Actions.ClearRecipeSearchSuggestionsAction)) {
        return {
            isLoading: state.isLoading,
            suggestions: [],
            queryResults: state.queryResults,
            currentQuery: state.currentQuery,
            currentSkipMarker: state.currentSkipMarker
        };
    }
    return state || unloadedState;
};