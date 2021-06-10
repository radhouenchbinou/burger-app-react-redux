import * as actionTypes from './actionTypes'
import axios from "axios";

const SIGNUP_API = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5KSjEGM1G8y6Wm1c2xyhDtkXHzYcGUJo';
const LOGIN_API = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5KSjEGM1G8y6Wm1c2xyhDtkXHzYcGUJo'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId, expiresIn) => {
    (userId)
    return {
        type: actionTypes.AUTH_SUCCES,
        idToken: token,
        userId: userId,
        expiresIn: expiresIn
    }
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expiration) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiration * 1000);
    }
}

export const authFails = (error) => {
    return {
        type: actionTypes.AUTH_FAILS,
        error: error
    }
};

export const auth = (email, password, isSingup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {email: email, password: password, returnSecureToken: true}
        axios.post(isSingup ? SIGNUP_API : LOGIN_API, authData)
            .then(response => {

                const expirationDate = new Date(new Date().getTime() + parseInt(response.data.expiresIn) * 1000);
                localStorage.setItem('user', JSON.stringify({
                    token: response.data.idToken,
                    userId: response.data.localId,
                    expirationDate: expirationDate,

                }))

                dispatch(authSuccess(response.data.idToken, response.data["localId"], response.data["expiresIn"]));
                dispatch(checkAuthTimeOut(response.data["expiresIn"]));
            }).catch(
            err => {
                dispatch(authFails(err.response.data.error))
            }
        )
    }
}


export const authCheckState = () => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(user.expirationDate);
            if (expirationDate > new Date()) {
                const expiresIn = expirationDate.getTime() - new Date().getTime();
                dispatch(authSuccess(user.token, user.userId, expiresIn / 1000));
                dispatch(checkAuthTimeOut(expiresIn / 1000));
            } else {
                dispatch(logout())
            }

        }
    }
}
