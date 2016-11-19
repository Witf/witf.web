import * as React from 'react';
import { Router, Route, HistoryBase } from 'react-router';
import { Layout } from './component_pages/layout';
import Home from './component_pages/home';

export default <Route component={ Layout }>
    <Route path='/' components={{ body: Home }} />
</Route>;

// Enable Hot Module Replacement (HMR)
if (module && module.hot) {
    module.hot.accept();
}
