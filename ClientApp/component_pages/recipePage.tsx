import * as React from "react";
import { provide } from "redux-typed";
import * as H from "history";
import "./recipePage.scss";
import {recipeDetailsActions} from "../store/actions/recipeDetailsActions";
import { Router, Route, Link } from "react-router";

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
                var recipeInFrame = !recipe.urlToRecipeAtSource.startsWith('http://www.frukt.no') ? "" : "displayNone";
                var recipeOutsideOfFrame = recipeInFrame === '' ? "displayNone" : "";

                return <div id="page_recipe">

                    <div className="recipe">                    
                        <div style={{backgroundImage: "url(" + recipe.imageUrl + ")"}} className="thumb"></div>
			            <div className="recipe-title"><h4>{recipe.title}</h4></div>
                        <div className="nav-container">
                            <nav>
                                <ul>
                                    <li><a href="#"><div>Ingredienser</div><div className="fact">{recipe.ingredients.length}</div></a></li>
                                    <li className={recipeInFrame}><Link alt={recipe.title} to={{ pathname : `directions`, query : {urlToRecipeAtSource: recipe.urlToRecipeAtSource} }}><div>Oppskrift</div><div className="fact"><i className="fa fa-clock-o"></i> {recipe.cookingTime.maxUsedTimeInMinutes} min</div></Link></li>
                                    <li className={recipeOutsideOfFrame}><a href={recipe.urlToRecipeAtSource} target="_blank"><div>Oppskrift</div><div className="fact"><i className="fa fa-clock-o"></i> {recipe.cookingTime.maxUsedTimeInMinutes} min</div></a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
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