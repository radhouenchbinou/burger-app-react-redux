import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../utils/actions-utility";


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true})
}
const authSuccess = (state, action) => {
        return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}
const authFails = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const logout = (state, action) => {
    localStorage.removeItem('user')
    return updateObject(state, {token: null, userId: null})
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCES:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAILS:
            return authFails(state, action);
        case actionTypes.AUTH_LOGOUT:
            return logout(state, action);
        default:
            return state

    }
};


export default authReducer;
