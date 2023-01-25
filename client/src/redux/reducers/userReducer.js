import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_RESET, UPDATE_PROFILE_FAIL,
    PASSWORD_UPDATE_REQUEST, PASSWORD_UPDATE_SUCCESS, PASSWORD_UPDATE_RESET, PASSWORD_UPDATE_FAIL,
    CLEAR_ERRORS,
} from '../constants/userConstants';


/**
 * ===== User Reducer =====
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
            };

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};



/**
 * ===== User Account/Profile =====
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export const accountReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case PASSWORD_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_PROFILE_SUCCESS:
        case PASSWORD_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case UPDATE_PROFILE_RESET:
        case PASSWORD_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case UPDATE_PROFILE_FAIL:
        case PASSWORD_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};