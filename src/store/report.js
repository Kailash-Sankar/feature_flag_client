import update from 'immutability-helper';
import { connect } from 'react-redux';

const initialState = {
    customer: undefined,
    product: undefined,
    feature: undefined,
    features: [],
    productList: { all: { name: "All", id: "all" } },
    result: [],
};

const types = {
    SET_CUSTOMER: 'SET_CUSTOMER',
    SET_PRODUCT: 'SET_PRODUCT',
    SET_FEATURE: 'SET_FEATURE',
    SET_FEATURES: 'SET_FEATURES',
    SET_PRODUCT_LIST: 'SET_PRODUCT_LIST',
    SET_RESULT: 'SET_RESULT',
}

const reportReducer = (state=initialState, action) => {
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
});

// state from root state
const mapStateToProps = (state) => state.report;

// connect
export const connecter = (Report) => connect(mapStateToProps, mapDispatchToProps)(Report);

export default reportReducer;