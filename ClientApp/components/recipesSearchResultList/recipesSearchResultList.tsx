import * as React from "react";
import "./recipesSearchResultList.scss";
import { RecipeCard } from "../recipeCard/recipeCard";
import { recipeSearchActions } from "../../store/actions/recipeSearchActions";

export interface IRecipesSearchResultListProps {
    recipies: IRecipe[];
    query: string;
    skipMarker: string;
    searching: boolean;
    more: Function;
}

export function RecipesSearchResultList(props: IRecipesSearchResultListProps) {
    const noResults = !!props.query && props.recipies.length < 1;

    if (noResults && !props.searching) {
        return <h5 style={{color: "#FFF", width: "100%" }}>Søk etter '{props.query}' gav ingen treff</h5>;
    }

    if (props.recipies.length > 0) {
        return (
            <div className="recipesSearchResultList">
                {props.recipies.map((recipe, i) => <RecipeCard recipe={recipe} key={i} />)}
                {props.recipies.length % 20 == 0 ? <div className="more centered"><button className="btn btn-default" onClick={() => props.more(props.query, props.skipMarker) }>Last flere oppskrifter</button>
				</div> : '' }
            </div>            
        );
    }

    return null;
}