﻿import * as React from "react";
import "./recipesSearchResultList.scss";

export function RecipeCard({recipe}: {recipe: Recipie }) {
    return (
        <a alt="recipe.title" href="#" className="hoverable recipetCard">
            <div className="recipetImage" style={{ backgroundImage: "url(\"" + recipe.imageUrl + "\")" }}></div>
            <div className="recipetInfo">
                <h1 className="title">{recipe.title}</h1>
            </div>
        </a>
    );
}

export interface IRecipesSearchResultListProps {
    recipies: Recipie[];
    query: string;
}

export function RecipesSearchResultList(props: IRecipesSearchResultListProps) {
    const noResults = !!props.query && props.recipies.length < 1;

    if (noResults) {
        return <h5 style={{color: "#FFF", width: "100%" }}>Søk etter '{props.query}' gav ingen treff</h5>;
    }

    if (props.recipies.length > 0) {
        return (
            <div className="recipesSearchResultList">
                {props.recipies.map((recipe, i) => <RecipeCard recipe={recipe} key={i} />)}
            </div>
        );
    }

    return null;
}