import * as React from "react";
import "./recipeSearchBox.scss";
import { LoadIcon } from "../loadIcon";
import { SearchIcon } from "../icons";
import Autosuggest from "react-autosuggest";
import { provide } from "redux-typed";
import * as Recipies from "../../store/recipe-search";

class RecipeSearchBox extends React.Component<SearchBoxProps, any> {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: []
        };
    }
    onChange(event, { newValue, method }) {
        this.setState({
            value: newValue
        });
    }

    renderSuggestion({suggestion}, query) {
        return <span>{suggestion}</span>;
    }

    componentDidMount() {
        this.input && this.input.focus();
    }
    input: any;
    storeInputReference(autosuggest) {
        if (autosuggest !== null) {
            this.input = autosuggest.input;
        }
    }

    queryRecipies() {
        this.props.queryRecipies(this.state.value);
    }

    onSubmitForm(e: React.SyntheticEvent<Event>) {
        e.preventDefault();
        this.queryRecipies();
    }

    render() {
        const inputProps = {
            placeholder: "",
            value: this.state.value,
            onChange: this.onChange.bind(this)
        };

        return (
            <div className="searchbox-wrapper">
                <h2 className="text-shadow center" style={{ color: "white" }}>Hva har du lyst på i dag?</h2>
                <form onSubmit={this.onSubmitForm.bind(this)}>
                    <div className="searchBox">
                        <Autosuggest
                            onSuggestionSelected={this.queryRecipies.bind(this)}
                            suggestions={this.props.suggestions}
                            onSuggestionsFetchRequested={this.props.querySuggestions}
                            onSuggestionsClearRequested={this.props.clearSuggestions}
                            getSuggestionValue={({ suggestion }) => suggestion}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps}
                            ref={this.storeInputReference.bind(this)} />
                        <button onClick={this.queryRecipies.bind(this)} className="searchBtn">Søk</button>
                    </div>
                </form>
                <LoadIcon style={{ marginTop: 15, opacity: this.props.isLoading ? 1 : 0 }} />
            </div>
        );
    }
}

const provider = provide(
    (state: IApplicationState) => state.recipies,
    Recipies.actionCreators
).withExternalProps<{

}>();

type SearchBoxProps = typeof provider.allProps;
export default provider.connect(RecipeSearchBox as any);