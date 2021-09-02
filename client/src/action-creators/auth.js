import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE } from "./actionTypes";
import { setAlert } from './alert';
import store from '../store'
import setAuthToken from '../utils/setAuthToken'

// Load a user
export const loadUser = () => async (dispatch) => {
    // verify that token is in localStorage
    if (localStorage.token) {
        // put token in header of all api requests
        setAuthToken(localStorage.token);
    }
    // send API request to test
    try {
        const res = await axios.get('/api/auth');
        store.dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        
    } catch (err) {
        store.dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register a new user
export const register = ({ name, email, password }) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post("/api/users", body, config);
        // payload is the token sent back        
        store.dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => store.dispatch(setAlert(error.msg, 'error')));
        }
        store.dispatch({
            type: REGISTER_FAIL
        })
    }
}