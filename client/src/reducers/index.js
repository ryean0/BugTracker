import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

// The root reducer
// States are saved in the store as { reducer: initialState, ... }
export default combineReducers({
    alert,
    auth,
})
