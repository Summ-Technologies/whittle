import {CallHistoryMethodAction, push} from 'connected-react-router'
import {ThunkDispatch} from 'redux-thunk'
import {WhittleAction} from '.'
import {RootState} from '..'
import {AppRoutes} from '../../stacks'
import {createApiAction} from './api'

export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST'
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'
export const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE'

export const GOOGLE_AUTH_REDIRECT_REQUEST = 'GOOGLE_AUTH_REDIRECT_REQUEST'
export const GOOGLE_AUTH_REDIRECT_SUCCESS = 'GOOGLE_AUTH_REDIRECT_SUCCESS'
export const GOOGLE_AUTH_REDIRECT_FAILURE = 'GOOGLE_AUTH_REDIRECT_FAILURE'

export const POST_GOOGLE_CALLBACK_REQUEST = 'POST_GOOGLE_CALLBACK_REQUEST'
export const POST_GOOGLE_CALLBACK_SUCCESS = 'POST_GOOGLE_CALLBACK_SUCCESS'
export const POST_GOOGLE_CALLBACK_FAILURE = 'POST_GOOGLE_CALLBACK_FAILURE'

export const GET_LINKED_GMAIL_REQUEST = 'GET_LINKED_GMAIL_REQUEST'
export const GET_LINKED_GMAIL_SUCCESS = 'GET_LINKED_GMAIL_SUCCESS'
export const GET_LINKED_GMAIL_FAILURE = 'GET_LINKED_GMAIL_FAILURE'

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
 * Requests redirect URL to connect google account.
 */
export function connectGoogleAccountStep1() {
  let endpoint = '/v1.0/auth/google/connect'
  return async (
    dispatch: ThunkDispatch<any, any, WhittleAction>,
    getState: () => RootState
  ) => {
    const step1Response = await dispatch(
      (createApiAction({
        endpoint,
        method: 'GET',
        types: [
          GOOGLE_AUTH_REDIRECT_REQUEST,
          GOOGLE_AUTH_REDIRECT_SUCCESS,
          GOOGLE_AUTH_REDIRECT_FAILURE,
        ],
      }) as unknown) as WhittleAction
    )
    let redirectUrl = (step1Response.payload as {redirect_url: string})
      .redirect_url
    if (redirectUrl) {
      window.location.href = redirectUrl
    }
  }
}

/**
 * Handles final step of oauth flow, reporting the values sent back by Google after auth step 1.
 */
export function postGoogleAuthCallback(currentUrl: string) {
  let endpoint = '/v1.0/auth/google/callback'
  return async (
    dispatch: ThunkDispatch<any, any, WhittleAction | CallHistoryMethodAction>,
    getState: () => RootState
  ) => {
    let postCallbackResp = (await (dispatch(
      createApiAction({
        endpoint,
        method: 'POST',
        body: JSON.stringify({callback_url: currentUrl}),
        types: [
          POST_GOOGLE_CALLBACK_REQUEST,
          POST_GOOGLE_CALLBACK_SUCCESS,
          POST_GOOGLE_CALLBACK_FAILURE,
        ],
      })
    ) as unknown)) as WhittleAction
    if (!postCallbackResp.error) {
      return dispatch(push(AppRoutes.getPath('Account')))
    }
  }
}

/**
 * Set user as logged out.
 */
export function logoutUser() {
  return {
    type: SET_LOGGED_OUT,
  }
}

/**
 * Get email address of linked google account if one exists.
 */
export function getLinkedGmailAccount() {
  let endpoint = '/v1.0/user/google/email'
  return createApiAction({
    endpoint,
    method: 'GET',
    types: [
      GET_LINKED_GMAIL_REQUEST,
      GET_LINKED_GMAIL_SUCCESS,
      GET_LINKED_GMAIL_FAILURE,
    ],
  })
}
