import * as React from "react";
import { provide } from "redux-typed";
import * as H from "history";
import "./recipePage.scss";
import {recipeDetailsActions} from "../store/actions/recipeDetailsActions";
import { Router, Route, Link } from "react-router";
import { Ingredients } from "../components/ingredients/ingredients";

class RecipePageClass extends React.Component<RecipePageProps, any>{

    componentDidMount() {
        this.props.loadRecipeDetails(this.props.params.id);
    }

    render() {
        const id = this.props.params.id;
        
        if (!!this.props.details[id]) {
            const detailsMeta = this.props.details[id];

            if (!!detailsMeta && !!detailsMeta.data) {

                var recipe = detailsMeta.data;

                let recipeTitle = null;

                if (!recipe.urlToRecipeAtSource.startsWith('http://www.frukt.no')) {
                    recipeTitle = <div className="recipe-title"><Link alt={recipe.title} to={{ pathname : `directions`, query : {urlToRecipeAtSource: recipe.urlToRecipeAtSource} }}><h4>{recipe.title}</h4></Link></div>;
                } else {
                    recipeTitle = <div className="recipe-title"><a href={recipe.urlToRecipeAtSource} target="_blank"><h4>{recipe.title}</h4></a></div>;
                }

                return <div id="page_recipe">

                    <div className="recipe">                    
                        <div style={{backgroundImage: "url(" + recipe.imageUrl + ")"}} className="thumb"></div>
                        {recipeTitle}                        
                    </div>
                    <div className="headers">
                        <div className="content"><span className="fact">{recipe.ingredients.length}</span> Ingredienser</div>
                        <div className="content"><span className="fact"><i className="fa fa-clock-o"></i> {recipe.cookingTime.maxUsedTimeInMinutes}</span> Minutter</div>
                    </div>
                    <Ingredients ingredients={recipe.ingredients} />
                </div>; 
            }

        } 

        return <div></div>;
    }
}


type ExternalProps = {
    location: H.Location,
    params: { id: string }
}

const provider = provide((state: IApplicationState) => {
        return {
            details: state.recipeDetails
        }
    },
    recipeDetailsActions
).withExternalProps<ExternalProps>();

type RecipePageProps = typeof provider.allProps;
export const RecipePage = provider.connect(RecipePageClass as any);