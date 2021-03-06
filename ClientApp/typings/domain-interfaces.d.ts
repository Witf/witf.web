﻿interface IEntityMeta<T> {
    data?: T;
    loading?: boolean;
    error?: boolean;
    lastRecieved?: Date;
}

interface IApplicationState {
    recipeSearch: IRecipeSearchsState;
    recipeDetails: IRecipeDetailsState;
    userProfile: IUserProfileState;
}

interface IRecipeDetailsState {
    [key:string]:IEntityMeta<IRecipeDetails>;
}

interface IRecipeSearchsState {
    isLoading: boolean;
    suggestions: ISearchSuggestion[];
    queryResults: IRecipe[];
    currentQuery: string;
    currentSkipMarker: string;
}

interface ISearchSuggestion {
    suggestion: string;
    type: "word"|null;
}

interface IRecipe {
    id: string;
    title: string;
    imageUrl: string;
    urlToRecipeAtSource: string;
    source: string;
    numberOfServings: string;
    cookingTime: ICookingTime;
}

interface IRecipeDetails extends IRecipe {
    ingredients: IIngredient[];
}

interface IIngredient {
    name: string;
    quantity: number;
    unit: string;
}

interface ICookingTime {
    minUsedTimeInMinutes: number;
    maxUsedTimeInMinutes: number;
}

interface IUserProfileState {
    name: string;
    picture: string;
}