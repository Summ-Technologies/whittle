import {RootState} from '..'
import {LoginStatus} from '../reducers/user'

export function getLoginStatus(state: RootState): LoginStatus {
  return state.user.loginStatus
}

export function getLinkedGoogleAccount(state: RootState): string | undefined {
  return state.user.googleAccount
}
