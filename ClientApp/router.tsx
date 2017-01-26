import * as React from "react";
import { Router, Route, HistoryBase, hashHistory, IndexRoute } from "react-router";
import { LayoutPage } from "./component_pages/layoutPage";
import { HomePage } from "./component_pages/homePage"; 
import { RecipePage } from "./component_pages/recipePage";
import { DirectionsPage } from "./component_pages/directions";

export default ()=>(<Router history={hashHistory}>
        <Route path="/" component={LayoutPage}>
            <IndexRoute component={HomePage}/>
            <Route path="/recipe/:id" component={RecipePage} />
            <Route path="/directions/:id" component={DirectionsPage} />
        </Route>
</Router>);


// export default {
//     component: LayoutPage,
//     childRoutes: [
//         { path: '/', components:{ body: HomePage } },
//         {
//             path: '/recipe/:id',
//             components:{ body: RecipePage },
//         },
//         {
//             path: '/directions',
//             components:{ body: DirectionsPage },
//         }
//     ]
// }
