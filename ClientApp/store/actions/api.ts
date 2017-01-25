import { apiService } from '../../services/bootstrapServices';
import * as recipeSearchActions from "./recipeSearchActions";
import * as recipeDetailsActions from "./recipeDetailsActions";

export const findRecipes = (query, skipMarker, dispatch) => {
    let skipMarkerParam = skipMarker ? `&skipMarker=${encodeURIComponent(skipMarker)}` : '';
    
    apiService.request({ 
        url: `/findRecipes?q=${query}${skipMarkerParam}&take=20`,
        method: 'GET',
        payload: undefined,
        onPayload: undefined,
        parse: true,
        onResult: (data: { recipes: IRecipe[], skipMarker: string }) => {
                    dispatch(new recipeSearchActions.CompletedQueryRecipesAction(query, data.skipMarker, data.recipes))}
})};

export const autocomplete = (value, dispatch) => apiService.request({
    url: `/autocomplete?w=${value}`,
    method: 'GET',
    payload: undefined,
    onPayload: undefined,
    parse: true,
    onResult: (data: ISearchSuggestion[]) => {
                dispatch(new recipeSearchActions.CompletedRecipeSearchSuggestionsAction(value, data))}
});

export const getRecipe = (id, dispatch) => apiService.request({
    url: `/recipe/${encodeURIComponent(id)}`,
    method: 'GET',
    payload: undefined,
    onPayload: undefined,
    parse: true,
    onResult: (recipe: IRecipeDetails) => {
                dispatch(new recipeDetailsActions.CompletedLoadingRecipeDetailsAction(id, recipe))}
});