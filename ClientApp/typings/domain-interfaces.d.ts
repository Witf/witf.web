interface IEntityMeta<T> {
    data?: T;
    loading?: boolean;
    error?: boolean;
    lastRecieved?: Date;
}

interface IApplicationState {
    recipeSearch: IRecipeSearchsState;
    recipeDetails: IRecipeDetailsState;
}

interface IRecipeDetailsState {
    [key:string]:IEntityMeta<IRecipeDetails>;
}

interface IRecipeSearchsState {
    isLoading: boolean;
    suggestions: ISearchSuggestion[];
    queryResults: IRecipe[];
    currentQuery: string;
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