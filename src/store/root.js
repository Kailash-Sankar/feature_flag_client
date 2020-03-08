import { combineReducers, createStore, applyMiddleware } from 'redux';
import auditReducer from './audit';
import reportReducer from './report';
import manageFeaturesReducer from './manageFeatures';
import customerFeaturesReducer from './customerFeatures';
import createSagaMiddleware from 'redux-saga'
import { initSaga } from "./sagas";


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    audit: auditReducer,
    report: reportReducer,
    manageFeatures: manageFeaturesReducer,
    customerFeatures: customerFeaturesReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
);

window.store = store;

sagaMiddleware.run(initSaga);

export default store;