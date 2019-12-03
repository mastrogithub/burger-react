import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => ({
    type: actionTypes.AUTH_START
})

export const authSuccess = ({idToken, localId}) => ({
    type: actionTypes.AUTH_SUCCESS,
    payload: {token: idToken, userId: localId}
})

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error
})

export const logout = () => ({
    type: actionTypes.AUTH_LOGOUT
})

export const checkAuthTimeout = ({expiresIn}) => dispatch => {
    setTimeout(() => {
        dispatch(logout())
    }, expiresIn * 1000);
}

export const auth = (email, password, isSignup) => dispatch => {
    dispatch(authStart())
    const [HOST, API_KEY] = ['https://identitytoolkit.googleapis.com','AIzaSyCfraeLJQ98aXiannrfM7DylYbEo2KeRvY']
    const url = isSignup ? `${HOST}/v1/accounts:signUp?key=${API_KEY}` : `${HOST}/v1/accounts:signInWithPassword?key=${API_KEY}`

    axios.post(url, { email, password, returnSecureToken: true })
        .then(res => {
            dispatch(authSuccess(res.data))
            dispatch(checkAuthTimeout(res.data))
        })
        .catch(error => {
            console.log('error', error)
            dispatch(authFail(error))
        })
}
