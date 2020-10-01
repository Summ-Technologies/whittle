import {CallHistoryMethodAction, push} from 'connected-react-router'
import {ThunkDispatch} from 'redux-thunk'
import {WhittleAction} from '.'
import {RootState} from '..'
import {SignupResponse} from '../../models/api'
import {AppRoutes} from '../../stacks'
import {createApiAction} from './api'

export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST'
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'
export const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE'

export const GMAIL_CONNECT_REDIRECT_REQUEST = 'GMAIL_CONNECT_REDIRECT_REQUEST'
export const GMAIL_CONNECT_REDIRECT_SUCCESS = 'GMAIL_CONNECT_REDIRECT_SUCCESS'
export const GMAIL_CONNECT_REDIRECT_FAILURE = 'GMAIL_CONNECT_REDIRECT_FAILURE'

export const GMAIL_CONNECT_CALLBACK_REQUEST = 'GMAIL_CONNECT_CALLBACK_REQUEST'
export const GMAIL_CONNECT_CALLBACK_SUCCESS = 'GMAIL_CONNECT_CALLBACK_SUCCESS'
export const GMAIL_CONNECT_CALLBACK_FAILURE = 'GMAIL_CONNECT_CALLBACK_FAILURE'

export const GOOGLE_LOGIN_REDIRECT_REQUEST = 'GOOGLE_LOGIN_REDIRECT_REQUEST'
export const GOOGLE_LOGIN_REDIRECT_SUCCESS = 'GOOGLE_LOGIN_REDIRECT_SUCCESS'
export const GOOGLE_LOGIN_REDIRECT_FAILURE = 'GOOGLE_LOGIN_REDIRECT_FAILURE'

export const GOOGLE_LOGIN_CALLBACK_REQUEST = 'GOOGLE_LOGIN_CALLBACK_REQUEST'
export const GOOGLE_LOGIN_CALLBACK_SUCCESS = 'GOOGLE_LOGIN_CALLBACK_SUCCESS'
export const GOOGLE_LOGIN_CALLBACK_FAILURE = 'GOOGLE_LOGIN_CALLBACK_FAILURE'

export const GOOGLE_SIGNUP_REDIRECT_REQUEST = 'GOOGLE_SIGNUP_REDIRECT_REQUEST'
export const GOOGLE_SIGNUP_REDIRECT_SUCCESS = 'GOOGLE_SIGNUP_REDIRECT_SUCCESS'
export const GOOGLE_SIGNUP_REDIRECT_FAILURE = 'GOOGLE_SIGNUP_REDIRECT_FAILURE'

export const GOOGLE_SIGNUP_CALLBACK_REQUEST = 'GOOGLE_SIGNUP_CALLBACK_REQUEST'
export const GOOGLE_SIGNUP_CALLBACK_SUCCESS = 'GOOGLE_SIGNUP_CALLBACK_SUCCESS'
export const GOOGLE_SIGNUP_CALLBACK_FAILURE = 'GOOGLE_SIGNUP_CALLBACK_FAILURE'

export const GET_LINKED_GMAIL_REQUEST = 'GET_LINKED_GMAIL_REQUEST'
export const GET_LINKED_GMAIL_SUCCESS = 'GET_LINKED_GMAIL_SUCCESS'
export const GET_LINKED_GMAIL_FAILURE = 'GET_LINKED_GMAIL_FAILURE'

export const POST_USER_SUBSCRIPTION_REQUEST = 'POST_USER_SUBSCRIPTION_REQUEST'
export const POST_USER_SUBSCRIPTION_SUCCESS = 'POST_USER_SUBSCRIPTION_SUCCESS'
export const POST_USER_SUBSCRIPTION_FAILURE = 'POST_USER_SUBSCRIPTION_FAILURE'

export const SET_LOGGED_IN = 'SET_LOGGED_IN'
export const SET_LOGGED_OUT = 'SET_LOGGED_OUT'

export const DELETE_LOGOUT_REQUEST = 'DELETE_LOGOUT_REQUEST'
export const DELETE_LOGOUT_SUCCESS = 'DELETE_LOGOUT_SUCCESS'
export const DELETE_LOGOUT_FAILURE = 'DELETE_LOGOUT_FAILURE'

/**
 * Sends DELETE request to login resource to remove cookie and logout user.
 */
export function deleteUserLogin() {
  let endpoint = '/v1.0/auth/login'
  return createApiAction({
    endpoint,
    method: 'DELETE',
    types: [
      DELETE_LOGOUT_REQUEST,
      DELETE_LOGOUT_SUCCESS,
      DELETE_LOGOUT_FAILURE,
    ],
  })
}

/**
 * Requests redirect URL to login with google
 */
export function googleLoginStep1() {
  let endpoint = '/v1.0/auth/google/login'
  return async (
    dispatch: ThunkDispatch<any, any, WhittleAction>,
    getState: () => RootState
  ) => {
    let redirectUrlResp = await dispatch(
      createApiAction({
        endpoint,
        method: 'GET',
        types: [
          GOOGLE_LOGIN_REDIRECT_REQUEST,
          GOOGLE_LOGIN_REDIRECT_SUCCESS,
          GOOGLE_LOGIN_REDIRECT_FAILURE,
        ],
      })
    )
    if (!redirectUrlResp.error) {
      window.location.href = redirectUrlResp.payload.redirect_url
    }
  }
}

/**
 * Handles final step of google login flow and gets logged in user details.
 */
export function googleLoginCallback(currentUrl: string) {
  let endpoint = '/v1.0/auth/google/login/callback'
  return async (
    dispatch: ThunkDispatch<any, any, WhittleAction | CallHistoryMethodAction>,
    getState: () => RootState
  ) => {
    let callbackResp = await dispatch(
      (createApiAction({
        endpoint,
        method: 'POST',
        body: JSON.stringify({callback_url: currentUrl}),
        types: [
          GOOGLE_LOGIN_CALLBACK_REQUEST,
          GOOGLE_LOGIN_CALLBACK_SUCCESS,
          GOOGLE_LOGIN_CALLBACK_FAILURE,
        ],
      }) as unknown) as WhittleAction
    )
    if (!callbackResp.error) {
      // return dispatch(push(AppRoutes.getPath('Box', {box: 'inbox'})))
      // TODO this shouldn't goto onboarding after login, but rather after signup. Doing this now for user interviews
      return dispatch(push(AppRoutes.getPath('Box', {box: 'inbox'})))
    }
  }
}

/**
 * Requests redirect URL to login with google
 */
export function googleSignupStep1() {
  let endpoint = '/v1.0/auth/google/signup'
  return async (
    dispatch: ThunkDispatch<any, any, WhittleAction>,
    getState: () => RootState
  ) => {
    let redirectUrlResp = await dispatch(
      createApiAction({
        endpoint,
        method: 'GET',
        types: [
          GOOGLE_SIGNUP_REDIRECT_REQUEST,
          GOOGLE_SIGNUP_REDIRECT_SUCCESS,
          GOOGLE_SIGNUP_REDIRECT_FAILURE,
        ],
      })
    )
    if (!redirectUrlResp.error) {
      window.location.href = redirectUrlResp.payload.redirect_url
    }
  }
}

/**
 * Handles final step of google login flow and gets logged in user details.
 */
export function googleSignupCallback(currentUrl: string) {
  let endpoint = '/v1.0/auth/google/signup/callback'
  return async (
    dispatch: ThunkDispatch<any, any, WhittleAction | CallHistoryMethodAction>,
    getState: () => RootState
  ) => {
    let callbackResp = await dispatch(
      (createApiAction({
        endpoint,
        method: 'POST',
        body: JSON.stringify({callback_url: currentUrl}),
        types: [
          GOOGLE_SIGNUP_CALLBACK_REQUEST,
          GOOGLE_SIGNUP_CALLBACK_SUCCESS,
          GOOGLE_SIGNUP_CALLBACK_FAILURE,
        ],
      }) as unknown) as WhittleAction
    )
    if (!callbackResp.error) {
      // return dispatch(push(AppRoutes.getPath('Box', {box: 'inbox'})))
      // TODO this shouldn't goto onboarding after login, but rather after signup. Doing this now for user interviews
      let payload = callbackResp.payload as SignupResponse
      if (payload.error_code && payload.error_code === '1002') {
        return dispatch(push(AppRoutes.getPath('Box', {box: 'inbox'})))
      } else {
        return dispatch(push(AppRoutes.getPath('Onboarding')))
      }
    }
  }
}

/**
 * Requests redirect URL to connect google account.
 */
export function connectGoogleAccountStep1() {
  let endpoint = '/v1.0/auth/google/gmail'
  return async (
    dispatch: ThunkDispatch<any, any, WhittleAction>,
    getState: () => RootState
  ) => {
    const step1Response = await dispatch(
      (createApiAction({
        endpoint,
        method: 'GET',
        types: [
          GMAIL_CONNECT_REDIRECT_REQUEST,
          GMAIL_CONNECT_REDIRECT_SUCCESS,
          GMAIL_CONNECT_REDIRECT_FAILURE,
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
  let endpoint = '/v1.0/auth/google/gmail/callback'
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
          GMAIL_CONNECT_CALLBACK_REQUEST,
          GMAIL_CONNECT_CALLBACK_SUCCESS,
          GMAIL_CONNECT_CALLBACK_FAILURE,
        ],
      })
    ) as unknown)) as WhittleAction
    if (!postCallbackResp.error) {
      // ANOTHER HACK FOR USER INTERVIEWS ONLY (gives some time for gmail to scrape inbox)
      const waitFor = (delay: number) =>
        new Promise((resolve) => setTimeout(resolve, delay))
      await waitFor(10000)
      return dispatch(push(AppRoutes.getPath('Box', {box: 'inbox'})))
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

/**
 * Post user subscription
 */

export function postUserSubscription(fromAddress: string) {
  let endpoint = '/v1.0/user/subscriptions'
  return createApiAction({
    endpoint,
    method: 'POST',
    body: JSON.stringify({fromAddress}),
    types: [
      POST_USER_SUBSCRIPTION_REQUEST,
      POST_USER_SUBSCRIPTION_SUCCESS,
      POST_USER_SUBSCRIPTION_FAILURE,
    ],
  })
}
