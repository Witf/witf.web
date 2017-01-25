import * as React from "react";
import "./recipeCard.scss";
import { Router, Route, Link } from "react-router";

export function RecipeCard({recipe}: { recipe: IRecipe }) {

    const imgStyle = { backgroundImage: `url("${recipe.imageUrl}")` };

    return (
        <Link alt={recipe.title} to={`recipe/${recipe.id}`} className="hoverable recipeCard">
            <div className="recipeImage" style={imgStyle}>
            </div>
            <div className="source">{recipe.source}.no</div>
            <div className="recipeInfo">
                <h1 className="title">{recipe.title}</h1>
            </div>
        </Link>
    );
}