import * as React from 'react';
import "./layoutPage.scss";
export interface LayoutProps {
    body: React.ReactElement<any>;
}

/**
 * This component will later hold menus and other layout props.
 */
export class LayoutPage extends React.Component<LayoutProps, void> {
    render() {
        return <div id="page_layout">
            <div className="headerImageContainer">
                <img className="headerImage" src="/static/images/food-kitchen-cutting-board-cooking-retina.jpg" />
            </div>
             { this.props.body }
             
        </div>;
    }
}
