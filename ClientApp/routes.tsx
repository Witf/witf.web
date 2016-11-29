import * as React from "react";
import { Router, Route, HistoryBase } from "react-router";
import { LayoutPage } from "./component_pages/layoutPage";
import { HomePage } from "./component_pages/homePage"; 
import { RecipePage } from "./component_pages/recipePage";

// export default <Route component={ LayoutPage }>
//     <Route path="/" components={{ body: HomePage }} />
//     <Route path="recipe/:id" components={{ body: RecipePage }} />
// </Route>;

export default {
    component: LayoutPage,
    childRoutes: [
        { path: '/', components:{ body: HomePage } },
        {
            path: '/recipe/:id',
            components:{ body: RecipePage },
        }
    ]
}
