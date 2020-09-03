import {createApiAction} from './api'

export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST'
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'
export const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE'

export const SET_LOGGED_IN = 'SET_LOGGED_IN'
export const SET_LOGGED_OUT = 'SET_LOGGED_OUT'

/**
 * Attempts login with username and password.
 */
export function postLogin(email: string, password: string) {
  let endpoint = '/v1.0/auth/login'
  return createApiAction({
    endpoint,
    method: 'POST',
    body: JSON.stringify({email, password}),
    types: [POST_LOGIN_REQUEST, POST_LOGIN_SUCCESS, POST_LOGIN_FAILURE],
  })
}

/**
 * Set user as logged out.
 */
export function logoutUser() {
  return {
    type: SET_LOGGED_OUT,
  }
}
