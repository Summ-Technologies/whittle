import {
  UserConfigResource,
  UserHomeResponse,
  UserResponse,
} from '../../models/api'
import {WhittleUser, WhittleUserConfig} from '../../models/whittle'
import {WhittleAction} from '../actions'
import {GET_USER_HOME_SUCCESS} from '../actions/boxes'
import {
  DELETE_LOGOUT_SUCCESS,
  GET_LINKED_GMAIL_SUCCESS,
  GOOGLE_LOGIN_CALLBACK_SUCCESS,
  PUT_USER_CONFIG_AUTO_ARCHIVE_SUCCESS,
  SET_LOGGED_OUT,
} from '../actions/user'

export type LoginStatus = 'LOGGED_IN' | 'LOGGED_OUT' | 'UNKNOWN'

export type UserState = {
  user: WhittleUser | undefined
  userConfig: WhittleUserConfig | undefined
  googleAccount: string | undefined
  loginStatus: LoginStatus
}

const initialState: UserState = {
  user: undefined,
  userConfig: undefined,
  googleAccount: undefined,
  loginStatus: 'UNKNOWN',
}

export default function articlesReducer(
  state: UserState = initialState,
  action: WhittleAction
): UserState {
  var payload
  switch (action.type) {
    case GET_USER_HOME_SUCCESS:
      payload = action.payload as UserHomeResponse
      return {
        ...state,
        user: payload.user,
        userConfig: payload.user_config,
      }
    case SET_LOGGED_OUT:
    case DELETE_LOGOUT_SUCCESS:
      return {
        ...state,
        user: undefined,
        googleAccount: undefined,
        loginStatus: 'LOGGED_OUT',
      }
    case GOOGLE_LOGIN_CALLBACK_SUCCESS:
      payload = action.payload as UserResponse
      return {
        ...state,
        user: payload.user,
        loginStatus: 'LOGGED_IN',
      }
    case GET_LINKED_GMAIL_SUCCESS:
      return {
        ...state,
        googleAccount: action.payload.email,
      }
    case PUT_USER_CONFIG_AUTO_ARCHIVE_SUCCESS:
      payload = action.payload as UserConfigResource
      return {...state, userConfig: payload}
    default:
      return state
  }
}
