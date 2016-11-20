import * as React from "react";
import "./recipeSearchBox.scss";
import Autosuggest from "react-autosuggest";
import { provide } from "redux-typed";
import { recipeSearchActions } from "../../store/actions/recipeSearchActions";
import {LoadIcon} from "../icons/loadIcon";
import * as H from "history";

class RecipeSearchBoxClass extends React.Component<SearchBoxProps, any> {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: []
        };
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

    onSuggestionsFetchRequested({value}) {
        const opts = value.split(" ");
        this.props.querySuggestions({value: opts[opts.length - 1] });
    }
    updateLastWord(suggestedValue) {
        const opts = this.state.value.split(" ");
        let newValue;
        if (opts.length > 1) {
            newValue = opts.slice(0, opts.length - 1).join(" ") + " " + suggestedValue;
        } else {
            newValue = suggestedValue;
        }
        this.setState({
            value: newValue
        });
    }
    onSuggestionSelected(a, {suggestionValue}) {
        this.updateLastWord(suggestionValue);
    }
    onChange(event, b) {
        const { newValue, method } = b;
        if (method !== "type") {
            this.updateLastWord(newValue);
        } else {
            this.setState({
                value: newValue
            });
        }
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
                            onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                            suggestions={this.props.suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
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
    (state: IApplicationState) => state.recipeSearchsState,
    recipeSearchActions
).withExternalProps<{
    location: H.Location,
}>();

type SearchBoxProps = typeof provider.allProps;
export const RecipeSearchBox = provider.connect(RecipeSearchBoxClass as any);