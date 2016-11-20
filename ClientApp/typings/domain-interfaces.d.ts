interface IEntityMeta<T> {
    data?: T;
    loading?: boolean;
    error?: boolean;
    lastRecieved?: Date;
}

interface IApplicationState {
    recipeSearchsState: IRecipeSearchsState;
    recipeDetails: IRecipeDetailsState;
}

interface IRecipeDetailsState {
    [key:string]:IEntityMeta<IRecipieDetails>;
}

interface IRecipeSearchsState {
    isLoading: boolean;
    suggestions: ISearchSuggestion[];
    queryResults: IRecipie[];
    currentQuery: string;
}

interface ISearchSuggestion {
    suggestion: string;
    type: "word"|null;
}

interface IRecipie {
    id: string;
    title: string;
    imageUrl: string;
    urlToRecipeAtSource: string;
    source: string;
    numberOfServings: string;
    cookingTime: ICookingTime;
}

interface IRecipieDetails extends IRecipie {
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