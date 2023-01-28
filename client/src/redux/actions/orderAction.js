import axios from 'axios';
import { API_URL } from '../../config';
import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL,
    CLEAR_ERRORS,
} from '../constants/orderConstants';


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
 * ======== Order Action =======
 * @param {Object} order 
 * @returns 
 */
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const { data } = await axios.post(`${API_URL}/order`, order, config);

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};


/**
 * ======== My Orders Action =======
 * @param {Object} order 
 * @returns 
 */
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get(`${API_URL}/order/myOrders`, config);

        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

/**
 * ====== Order Details =====
 * @param {String} id 
 * @returns 
 */
export const orderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`${API_URL}/order/${id}`, config);

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

/**
 * ====== All Orders Action Admin =====
 * @returns 
 */
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await axios.get(`${API_URL}/order/all`, config);

        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};



/**
 * ======= Clear The Error Action ======
 * @returns 
 */
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
