import {UserResource} from '../../models/api'
import {WhittleUser} from '../../models/whittle'
import {WhittleAction} from '../actions'
import {POST_LOGIN_SUCCESS, SET_LOGGED_OUT} from '../actions/user'

export type LoginStatus = 'LOGGED_IN' | 'LOGGED_OUT' | 'UNKNOWN'

export type UserState = {
  user: WhittleUser | undefined
  loginStatus: LoginStatus
}

const initialState: UserState = {
  user: undefined,
  loginStatus: 'UNKNOWN',
}

export default function articlesReducer(
  state: UserState = initialState,
  action: WhittleAction
): UserState {
  var payload
  switch (action.type) {
    case SET_LOGGED_OUT:
      return {
        ...state,
        user: undefined,
        loginStatus: 'LOGGED_OUT',
      }
    case POST_LOGIN_SUCCESS:
      payload = action.payload as {user: UserResource}
      return {
        ...state,
        user: payload.user,
        loginStatus: 'LOGGED_IN',
      }
    default:
      return state
  }
}
