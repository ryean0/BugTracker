// checks if a token is in localStorage; adds token to all request headers if its there and delete from headers if not in localStorage

import axios from 'axios'
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.default.headers.common('x-auth-token')
    }
}

export default setAuthToken;