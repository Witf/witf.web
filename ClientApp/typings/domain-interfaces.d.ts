interface IApplicationState {
    recipies: IRecipeSearchsState;
}

interface IRecipeSearchsState {
    isLoading: boolean;
    suggestions: ISearchSuggestion[];
    queryResults: Recipie[];
    currentQuery: string;
}

interface ISearchSuggestion {
    suggestion: string;
    type: "word"|null;
}

interface Recipie {
    id: string;
    title: string;
    imageUrl: string;
    urlToRecipeAtSource: string;
    source: string;
    numberOfServings: string;
    cookingTime: CookingTime;
}

interface CookingTime {
    minUsedTimeInMinutes: number;
    maxUsedTimeInMinutes: number;
}