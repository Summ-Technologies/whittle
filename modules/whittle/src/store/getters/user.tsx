import {RootState} from '..'
import {WhittleUser} from '../../models/whittle'
import {LoginStatus} from '../reducers/user'

export function getLoginStatus(state: RootState): LoginStatus {
  return state.user.loginStatus
}

export function getLinkedGoogleAccount(state: RootState): string | undefined {
  return state.user.googleAccount
}

export function getUser(state: RootState): WhittleUser | undefined {
  return state.user.user
}
