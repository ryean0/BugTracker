import { SET_ALERT, REMOVE_ALERT } from "../action-creators/actionTypes";
import store from '../store'

import { v4 as uuid } from 'uuid';

// 4 possible alert types: error, info, warning

export const setAlert = (msg, alertType, timeout=5000) => {
    const id = uuid();
    store.dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });
    setTimeout(() => store.dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), timeout)
}