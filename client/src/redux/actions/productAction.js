import axios from 'axios';
import {
    ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET,
    CLEAR_ERRORS,
} from '../constants/productConstants';
import { API_URL } from '../../config';


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
 * ====== Get All Products ======
 */
export const getProduct = (
    keyword = '',
    currentPage = 1,
    price = [0, 9999999],
    category,
    ratings = 0,
) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        let endpoint_link = `${API_URL}/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category && category !== "All") {
            endpoint_link = `${API_URL}/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const { data } = await axios.get(endpoint_link, config);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
};


/**
 * ====== Get Product Details ======
 */
export const getProductDetails = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`${API_URL}/product/${productId}`, config);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
};


/**
 * ===== New Review Make =====
 * @param {Object} reviewData 
 * @returns 
 */
export const newReview = (productId, reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const { data } = await axios.put(`${API_URL}/product/review/${productId}`, reviewData, config);
        dispatch({ 
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({ type: NEW_REVIEW_FAIL });
    }
};


/**
 * ====== Clear All Errors ======
 */
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};