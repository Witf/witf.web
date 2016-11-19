import * as React from "react";
import "./recipeCard.scss";

export function RecipeCard({recipe}: { recipe: Recipie }) {
    return (
        <a alt="recipe.title" href="#" className="hoverable recipetCard">
            <div className="recipetImage" style={{ backgroundImage: "url(\"" + recipe.imageUrl + "\")" }}></div>
            <div className="recipetInfo">
                <h1 className="title">{recipe.title}</h1>
            </div>
        </a>
    );
}