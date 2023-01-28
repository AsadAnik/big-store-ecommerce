import axios from 'axios';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,
    PASSWORD_UPDATE_REQUEST, PASSWORD_UPDATE_SUCCESS, PASSWORD_UPDATE_FAIL,
    ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL,
    CLEAR_ERRORS,
} from '../constants/userConstants';
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
 * ===== Login Action =====
 * @param {String} email 
 * @param {String} password 
 * @returns 
 */
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const { data } = await axios.post(`${API_URL}/auth/login`, { email, password }, config);

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

/**
 * ===== Register Action ======
 * @param {Object} userData 
 * @returns 
 */
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const { data } = await axios.post(`${API_URL}/auth/register`, userData, {
            header: {
                "Content-type": "multipart/form-data",
            },
            withCredentials: true,
            mode: 'cors',
        });

        dispatch({ type: REGISTER_SUCCESS, payload: data.user });

    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
};

/**
 * ====== Logout Action =====
 * @returns 
 */
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${API_URL}/auth/logout`, config);

        dispatch({ type: LOGOUT_SUCCESS });

    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};


/**
 * ===== Load User to Profile Info =====
 * @returns 
 */
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`${API_URL}/user/profile`, config);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });

    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};


/**
 * ===== Update Account/Profile Action ======
 * @param {Object} userData 
 * @returns 
 */
export const updateAccount = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const { data } = await axios.put(`${API_URL}/user/profile`, userData, {
            header: {
                "Content-type": "multipart/form-data",
            },
            withCredentials: true,
            mode: 'cors',
        });

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });

    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message });
    }
};

/**
 * ===== Password Update / Change Action ======
 * @param {String} password 
 * @returns 
 */
export const passwordUpdate = (password) => async (dispatch) => {
    try {
        dispatch({ type: PASSWORD_UPDATE_REQUEST });

        const { data } = await axios.put(`${API_URL}/user/update_password`, password, config);

        dispatch({ type: PASSWORD_UPDATE_SUCCESS, payload: data.success });

    } catch (error) {
        dispatch({ type: PASSWORD_UPDATE_FAIL, payload: error.response.data.message });
    }
};


/**
 * ====== All Users Admin =====
 * @returns 
 */
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        
        const { data } = await axios.get(`${API_URL}/user/admin/users`, config);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};


/**
 * ====== Clear All Errors ======
 */
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};