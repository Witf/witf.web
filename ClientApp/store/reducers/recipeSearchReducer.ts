import { isActionType, Reducer } from 'redux-typed';
import * as Actions from "../actions/recipeSearchActions";
const unloadedState: IRecipeSearchsState = {
    isLoading: false,
    suggestions: [],
    queryResults: [],
    currentQuery: ""
};

export const recipeSearchReducer: Reducer<IRecipeSearchsState> = (state, action) => {
    if (isActionType(action, Actions.QueryRecipesAction)) {
        return {
            suggestions: state.suggestions,
            currentQuery: action.query,
            isLoading: true,
            queryResults: state.queryResults
        };
    }
    if (isActionType(action, Actions.RecievedRecipiQueryAction)) {
        return {
            suggestions: state.suggestions,
            currentQuery:
            state.currentQuery,
            isLoading: false,
            queryResults: action.recipies
        };
    }
    if (isActionType(action, Actions.RecievedRecipeSearchSuggestionsAction)) {
        return {
            suggestions: action.suggestions,
            currentQuery: state.currentQuery,
            isLoading: state.isLoading,
            queryResults: state.queryResults
        };
    }
    if (isActionType(action, Actions.ClearRecipeSearchSuggestionsAction)) {
        return {
            suggestions: [],
            currentQuery: state.currentQuery,
            isLoading: state.isLoading,
            queryResults: state.queryResults
        };
    }
    return state || unloadedState;
};