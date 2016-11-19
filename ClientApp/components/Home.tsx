import * as React from "react";
import { provide } from "redux-typed";
import RecipeSearchBox from "./recipeSearchBox/recipeSearchBox";
import { LoadIcon } from "./loadIcon";
import "./home.scss";
import {RecipesSearchResultList} from "./recipesSearchResultList/recipesSearchResultList";

class Home extends React.Component<HomeProps, { searchText: string; }> {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        };

    }

    public render() {

        return (
            <div id="page_home">
                <div className="headerImageContainer">
                    <img className="headerImage" src="static/images/food-kitchen-cutting-board-cooking-retina.jpg" />
                </div>
                <div className="page">
                    <RecipeSearchBox />
                    <RecipesSearchResultList query={this.props.currentQuery} recipies={this.props.queryResults}/>
                </div>
            </div>
        );
    }
}

const provider = provide(
    (state: IApplicationState) => state.recipies,
    {}
).withExternalProps<{ params: { q: string } }>();
type HomeProps = typeof provider.allProps;
export default provider.connect(Home as any);