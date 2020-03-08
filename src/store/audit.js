import update from 'immutability-helper';
import { connect } from 'react-redux';
import { applyScope } from './utils';

const scope = 'AUDIT';

const initialState = {
    customer: 'all',
    product: 'all',
    feature: undefined,
    features: [],
    productList: { all: { name: "All", id: "all" } },
    result: [],
};

export const types = applyScope(scope, [
    'SET_CUSTOMER',
    'SET_PRODUCT',
    'SET_FEATURE',
    'SET_FEATURES',
    'SET_PRODUCT_LIST',
    'SET_RESULT',
    'SEARCH',
    'FETCH_FEATURES',
]);

const auditReducer = (state=initialState, action) => {
    switch(action.type) {
        case types.SET_CUSTOMER:
            return update(state,{
                customer: { $set: action.customer }
            });
        case types.SET_PRODUCT:
            return update(state,{
                product: { $set: action.product }
            });
        case types.SET_FEATURE:
            return update(state,{
                feature: { $set: action.feature }
            });
        case types.SET_FEATURES:
            return update(state,{
                features: { $set: action.features }
            });
        case types.SET_PRODUCT_LIST:
            return update(state,{
                productList: { $set: action.productList }
            });
        case types.SET_RESULT:
            return update(state,{
                result: { $set: action.result }
            });    
    }
    return state;
};


// dispatch actions
const mapDispatchToProps = (dispatch) => ({
    setCustomer: (customer) => dispatch({
        type: types.SET_CUSTOMER,
        customer,
    }),
    setProduct: (product) => dispatch({
        type: types.SET_PRODUCT,
        product,
    }),
    setFeature: (feature) => dispatch({
        type: types.SET_FEATURE,
        feature,
    }),
    setFeatures: (features) => dispatch({
        type: types.SET_FEATURES,
        features,
    }),
    setProductList: (productList) => dispatch({
        type: types.SET_PRODUCT_LIST,
        productList,
    }),
    setResult: (result) => dispatch({
        type: types.SET_RESULT,
        result,
    }),
    search: (params) => dispatch({
        type: types.SEARCH,
        params,
    }),
    fetchFeatures: (product) => dispatch({
        type: types.FETCH_FEATURES,
        product
    }),    
});

// state from root state
const mapStateToProps = (state) => state.audit;

// connect
export const connecter = (Audit) => connect(mapStateToProps, mapDispatchToProps)(Audit);

export default auditReducer;