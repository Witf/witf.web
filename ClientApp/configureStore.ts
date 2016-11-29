import { createStore, applyMiddleware, compose, combineReducers, GenericStoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
import * as Store from './store/store';
import { typedToPlain } from 'redux-typed';

export default function configureStore(initialState?: IApplicationState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    // If devTools is installed, connect to it
    const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension as () => GenericStoreEnhancer;
    const createStoreWithMiddleware = compose(
        applyMiddleware(thunk, typedToPlain),
        devToolsExtension ? devToolsExtension() : f => f 
    )(createStore);
  
    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(Store.reducers);
    const store = createStoreWithMiddleware(allReducers, initialState) as Redux.Store<IApplicationState>;

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./store/store', () => {
            const nextRootReducer = require<typeof Store>('./store/store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }
      
    return store;
    
}

function buildRootReducer(allReducers) {
    return combineReducers<IApplicationState>(Object.assign({}, allReducers));
}
