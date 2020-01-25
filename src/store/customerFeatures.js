import update from 'immutability-helper';
import { connect } from 'react-redux';
import { applyScope } from './utils';

const scope = 'customerFeatures';

const initialState = {
    customer: undefined,
    product: undefined,
    features: [],
    productList: { all: { name: "All", id: "all" } },
    reset: 1,
    saving: false,
};

const types = applyScope(scope, [
    'SET_CUSTOMER',
    'SET_PRODUCT',
    'SET_FEATURES',
    'SET_PRODUCT_LIST',
    'SET_RESET',
    'SET_SAVING',
]);

const customerFeaturesReducer = (state=initialState, action) => {
    switch(action.type) {
        case types.SET_CUSTOMER:
            return update(state,{
                customer: { $set: action.customer }
            });
        case types.SET_PRODUCT:
            return update(state,{
                product: { $set: action.product }
            });
        case types.SET_FEATURES:
            return update(state,{
                features: { $set: action.features }
            });
        case types.SET_PRODUCT_LIST:
            return update(state,{
                productList: { $set: action.productList }
            });
        case types.SET_RESET:
            return update(state,{
                reset: { $set: action.reset }
            });
        case types.SET_SAVING:
            return update(state,{
                saving: { $set: action.saving }
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
    setReset: (reset) => dispatch({
        type: types.SET_RESET,
        reset,
    }),
    setSaving: (saving) => dispatch({
        type: types.SET_SAVING,
        saving,
    }),   
});

// state from root state
const mapStateToProps = (state) => state.customerFeatures;

// connect
export const connecter = (CustomerFeatures) => connect(mapStateToProps, mapDispatchToProps)(CustomerFeatures);

export default customerFeaturesReducer;