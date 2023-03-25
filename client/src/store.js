import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { allProductsReducer, productDetailsReducer, productReducer, createNewProductReducer, newReviewReducer } from './redux/reducers/productReducer';
import { userReducer, accountReducer, allUsersReducer } from './redux/reducers/userReducer';
import { cartReducer } from './redux/reducers/cartReducer';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, oderReducer } from './redux/reducers/orderReducer';

const reducer = combineReducers({
    products: allProductsReducer,
    productDetails: productDetailsReducer,
    product: productReducer,
    newProduct: createNewProductReducer,
    user: userReducer,
    account: accountReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    allUsers: allUsersReducer,
    allOrders: allOrdersReducer,
    order: oderReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;