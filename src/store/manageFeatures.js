import update from "immutability-helper";
import { connect } from "react-redux";
import { applyScope } from "./utils";
import { pageSelector } from "./selectors";

const scope = "manageFeatures";

const initialState = {
  product: undefined,
  feature: undefined,
  features: [],
  mode: true,
  reset: 1,
  packages: { "0": { id: 0, name: "Custom" } }
};

export const types = applyScope(scope, [
  "SET_PRODUCT",
  "SET_FEATURE",
  "SET_FEATURES",
  "SET_MODE",
  "SET_RESET",
  "SAVE"
]);

const manageFeaturesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PRODUCT:
      return update(state, {
        product: { $set: action.product }
      });
    case types.SET_FEATURE:
      return update(state, {
        feature: { $set: action.feature }
      });
    case types.SET_FEATURES:
      return update(state, {
        features: { $set: action.features }
      });
    case types.SET_MODE:
      return update(state, {
        mode: { $set: action.mode }
      });
    case types.SET_RESET:
      return update(state, {
        reset: { $set: state.reset + 1 }
      });
  }
  return state;
};

// dispatch actions
const mapDispatchToProps = (dispatch) => ({
  setProduct: (product) =>
    dispatch({
      type: types.SET_PRODUCT,
      product
    }),
  setFeature: (feature) =>
    dispatch({
      type: types.SET_FEATURE,
      feature
    }),
  setFeatures: (features) =>
    dispatch({
      type: types.SET_FEATURES,
      features
    }),
  setMode: (mode) =>
    dispatch({
      type: types.SET_MODE,
      mode
    }),
  setReset: () =>
    dispatch({
      type: types.SET_RESET
    }),
  save: (formData) =>
    dispatch({
      type: types.SAVE,
      formData
    })
});

// state from root state
const mapStateToProps = pageSelector(scope);

// connect
export const connecter = (ManageFeatures) =>
  connect(mapStateToProps, mapDispatchToProps)(ManageFeatures);

export default manageFeaturesReducer;
