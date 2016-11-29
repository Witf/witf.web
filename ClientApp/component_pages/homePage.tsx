import * as React from "react";
import { provide } from "redux-typed";
import { RecipeSearchBox } from "../components/recipeSearchBox/recipeSearchBox";
import "./homePage.scss";
import * as H from "history";
import {RecipesSearchResultList} from "../components/recipesSearchResultList/recipesSearchResultList";

class Home extends React.Component<HomeProps, { searchText: string; }> {
    constructor(props) {
        super(props);
    }
    
    public render() {
        return (
            <div id="page_home">
                <div className="page">
                    <RecipeSearchBox location={this.props.location}/>
                    <RecipesSearchResultList 
                    searching={this.props.isLoading} 
                    query={this.props.currentQuery} 
                    recipies={this.props.queryResults}/>
                </div>
            </div>
        );
    }
}

const provider = provide(
    (state: IApplicationState) => state.recipeSearchsState,{}
).withExternalProps<{
    location: H.Location,
    params: { q: string }
}>();
type HomeProps = typeof provider.allProps;
export const HomePage = provider.connect(Home as any);