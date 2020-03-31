import { combineReducers, createStore, applyMiddleware } from "redux";
import commonReducer from "./common";
import auditReducer from "./audit";
import reportReducer from "./report";
import manageFeaturesReducer from "./manageFeatures";
import customerFeaturesReducer from "./customerFeatures";
import createSagaMiddleware from "redux-saga";
import { initSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  common: commonReducer,
  audit: auditReducer,
  report: reportReducer,
  manageFeatures: manageFeaturesReducer,
  customerFeatures: customerFeaturesReducer
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

window.store = store;

sagaMiddleware.run(initSaga);

export default store;
