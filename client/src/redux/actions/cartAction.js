import axios from 'axios';
import { API_URL } from '../../config';
import { 
    ADD_TO_CART, 
    REMOVE_CART_ITEM, 
    SAVE_SHIPPING_INFO 
} from '../constants/cartConstants';


// -------- CONFIG For All CORS Allows and Types of Headers and Credentials ------
const config = {
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": `${API_URL}`
    },
    withCredentials: true,
    mode: 'cors',
};


/**
 * ===== Product to Add in Cart =====
 * @param {String} id 
 * @param {Number} quantity 
 * @returns 
 */
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${API_URL}/product/${id}`, config);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        },
    });

    // Let's save the cart items into Local Storage..
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

/**
 * ====== Remove Product From Cart =====
 * @param {String} id 
 * @returns 
 */
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });

    // Let's save the cart items into Local Storage..
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

/**
 * ====== Save The Shipping Info =====
 * @param {Object} data 
 * @returns 
 */
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    });

    // Saving shipping info to Local Storage..
    localStorage.setItem("shippingInfo", JSON.stringify(data));
};