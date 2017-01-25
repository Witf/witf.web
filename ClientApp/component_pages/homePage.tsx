﻿import * as React from "react";
import { provide } from "redux-typed";
import { RecipeSearchBox } from "../components/recipeSearchBox/recipeSearchBox";
import "./homePage.scss";
import * as H from "history";
import {Header} from "../components/header/header";
import { RecipesSearchResultList } from "../components/recipesSearchResultList/recipesSearchResultList";
import { recipeSearchActions } from "../store/actions/recipeSearchActions";

class Home extends React.Component<HomeProps, { searchText: string; }> {
    constructor(props) {
        super(props);
    }
    
    public render() {
        return (
            <div id="page_home">
                <div className="page">
                    <Header />    
                    <RecipeSearchBox location={this.props.location}/>
                    <RecipesSearchResultList 
                        searching={this.props.isLoading} 
                        query={this.props.currentQuery} 
                        skipMarker={this.props.currentSkipMarker}
                        recipies={this.props.queryResults}
                        more={this.props.queryRecipies}
                        />
                </div>
            </div>
        );
    }
}

const provider = provide(
    (state: IApplicationState) => state.recipeSearch,recipeSearchActions
).withExternalProps<{
    location: H.Location,
    params: { q: string }
}>();
type HomeProps = typeof provider.allProps;
export const HomePage = provider.connect(Home as any);