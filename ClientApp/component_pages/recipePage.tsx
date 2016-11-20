import * as React from "react";
import { provide } from "redux-typed";
import * as H from "history";
import {recipeDetailsActions} from "../store/actions/recipeDetailsActions";

class RecipePageClass extends React.Component<RecipePageProps, any>{

    componentDidMount() {
        this.props.loadRecipeDetails(this.props.params.id);
    }

    render() {
        return <div>Test</div>;
    }
}


type ExternalProps = {
    location: H.Location,
    params: { id: string }
}
const provider = provide((state: IApplicationState) => state.recipeSearchsState,
    recipeDetailsActions
).withExternalProps<ExternalProps>();
type RecipePageProps = typeof provider.allProps;
export const RecipePage = provider.connect(RecipePageClass as any);