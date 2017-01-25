import * as React from "react";
import { provide } from "redux-typed";
import * as H from "history";
import "./recipePage.scss";
import {recipeDetailsActions} from "../store/actions/recipeDetailsActions";
import { Router, Route, Link, browserHistory } from "react-router";
import { Ingredients } from "../components/ingredients/ingredients";

class RecipePageClass extends React.Component<RecipePageProps, any>{

    componentDidMount() {
        this.props.loadRecipeDetails(this.props.params.id);
    }

    goBack() {
        browserHistory.goBack();
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

                const imgStyle = { backgroundImage: `url("${recipe.imageUrl}")` };

                return <div id="page_recipe">

                    <img className="close" onClick={this.goBack} src="/static/images/close-Window-icon.png" />

                    <div className="recipe-wrapper">                    
                
                        <div className="recipe">                    
                            <div style={imgStyle} className="thumb"></div>
                            {recipeTitle}
                            <h5 className="source">{recipe.source.toLowerCase()}.no</h5>
                        </div>

                    </div>

                    <div className="headers">
                        <div className="content">
                            <span className="fact">{recipe.ingredients.length}</span> Ingredienser
                        </div>
                        <div className="content">
                            <span className="fact"><i className="fa fa-clock-o"></i> {recipe.cookingTime.maxUsedTimeInMinutes}</span> Minutter
                        </div>
                        <div className="content pull-right numberOfServings">
                            <span className="fact">{recipe.numberOfServings}</span> <span className="text">personer</span>
                        </div>
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