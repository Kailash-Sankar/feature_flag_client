import { combineReducers, createStore } from 'redux';
import auditReducer from './audit';
import reportReducer from './report';
import manageFeaturesReducer from './manageFeatures';
import customerFeaturesReducer from './customerFeatures';

const rootReducer = combineReducers({
    audit: auditReducer,
    report: reportReducer,
    manageFeatures: manageFeaturesReducer,
    customerFeatures: customerFeaturesReducer,
});

const store = createStore(rootReducer);
window.store = store;

export default store;