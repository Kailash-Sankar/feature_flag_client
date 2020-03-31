import update from "immutability-helper";
import { applyScope } from "./utils";

const initialState = {
  customers: [],
  products: []
};

const scope = "common";

export const types = applyScope(scope, ["SET_CUSTOMERS", "SET_PRODUCTS"]);

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CUSTOMERS:
      return update(state, {
        customers: { $set: action.customers }
      });
    case types.SET_PRODUCTS:
      return update(state, {
        products: { $set: action.products }
      });
  }
  return state;
};

export default commonReducer;
