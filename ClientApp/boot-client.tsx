import './css/main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './configureStore';
// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as IApplicationState;
const store = configureStore(initialState);

// This code starts up the React app when it runs in a browser. It sets up the routing configuration
// and injects the app into a DOM element.
const root = document.getElementById("app");
ReactDOM.render(
        <Provider store={ store }>
            <Router history={ browserHistory } children={ routes } /> 
        </Provider>,
    root
);
// Enable Hot Module Replacement (HMR)
if (module && module.hot) {
    console.log("Enabeling HMR");
    module.hot.accept();
}