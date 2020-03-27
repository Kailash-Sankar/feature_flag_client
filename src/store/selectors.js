import { createSelector } from "reselect";
import { createMap } from "./utils";

const selector = (state) => state;

const customers = (state) => state.common.customers;
const products = (state) => state.common.products;

const customersSelector = createSelector([customers], (customers) => {
  return createMap(customers);
});

const productsSelector = createSelector([products], (products) => {
  return createMap(products);
});

const genScopeSelector = (scope) => {
  return createSelector([selector], (state) => state[scope]);
};

// generates a selector for each page
// combines common data with page scope
export const pageSelector = (scope) => {
  const scopeSelector = genScopeSelector(scope);

  return createSelector(
    [customersSelector, productsSelector, scopeSelector],
    (customers, products, scopedState) => {
      // console.log("selector", customers, products, scopedState);
      return {
        customers,
        products,
        ...scopedState
      };
    }
  );
};
