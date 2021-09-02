import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../action-creators/actionTypes';

// Set initial state of auth reducer (state.auth)
const initialState = {
    token: localStorage.getItem('token'),
    isAuth: null,
    loading: true,
    user: null
}

export default function(state=initialState, action) {
    switch(action.type) {
        case REGISTER_SUCCESS:
            // log user in, and save token in localStorage
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                loading: false
            }
        default:
            return state;
    }
}