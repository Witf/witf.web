import * as React from "react";
import "./recipeCard.scss";
import { Router, Route, Link } from "react-router";

export function RecipeCard({recipe}: { recipe: IRecipie }) {

    const imgStyle = { backgroundImage: `url("${recipe.imageUrl}")` };

    return (
        <Link alt={recipe.title} to={`recipe/${recipe.id}`} className="hoverable recipetCard">
            <div className="recipetImage" style={imgStyle}></div>
            <div className="recipetInfo">
                <h1 className="title">{recipe.title}</h1>
            </div>
        </Link>
    );
}