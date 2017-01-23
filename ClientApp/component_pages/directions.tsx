import * as React from "react";
import { provide } from "redux-typed";
import * as H from "history";
import "./directions.scss";
import { browserHistory } from "react-router";

class DirectionsPageClass extends React.Component<DirectionsPageProps, any>{

    componentDidMount() {
    }

    goBack() {
        browserHistory.goBack();
    }

    render() {

        const urlToRecipeAtSource = (this.props.location.query as any).urlToRecipeAtSource;

        return <div id="page_directions">
            <img className="close" onClick={this.goBack} src="/static/images/close-Window-icon.png" />

            <i className="fa fa-spinner fa-spin"></i>
            <iframe src={urlToRecipeAtSource}></iframe>

        </div>; 
    }
}


type ExternalProps = {
    location: H.Location,
    params: { urlToRecipeAtSource: string }
}

const provider = provide((state: IApplicationState) => {
        return {}
    }, {}
).withExternalProps<ExternalProps>();

type DirectionsPageProps = typeof provider.allProps;
export const DirectionsPage = provider.connect(DirectionsPageClass as any);