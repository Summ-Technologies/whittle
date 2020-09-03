import {Action} from 'redux'
import {createAction, RSAACall} from 'redux-api-middleware'
import {ThunkDispatch} from 'redux-thunk'
import {RootState} from '..'
import config, {SERVER_BASE_URL_KEY} from '../../config'
import {logoutUser} from './user'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}

/* Adds default headers and authentication headers to every request */
var headers = (customHeaders = {}) => {
  var headers: Function
  if (customHeaders instanceof Function) headers = customHeaders
  else headers = () => customHeaders
  return (store: RootState) => {
    return {...DEFAULT_HEADERS, ...headers(store)}
  }
}

/* Custom fetch implementation to use in redux-api-middleware */
var _fetch = async (path: RequestInfo, opts?: RequestInit) => {
  let baseUrl: string = config.get(SERVER_BASE_URL_KEY)
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1)
  }
  const url = baseUrl + path

  // Ensure login cookie is included in fetch
  if (opts) {
    opts.credentials = 'include'
  } else {
    opts = {
      credentials: 'include',
    }
  }

  return await fetch(url, opts)
}

/**
 * Generic action creator. Given input, adds default
 *  summn's logic, and creates an action for use
 *  by redux-api-middleware
 */
export function createApiAction(args: RSAACall<RootState, unknown, unknown>) {
  return async (
    dispatch: ThunkDispatch<any, any, Action<any>>,
    getState: () => RootState
  ) => {
    args.fetch = _fetch
    args.headers = headers(args.headers)
    const response = await dispatch(createAction(args) as any)
    if (response.error && response.payload.status === 401) {
      return await dispatch(logoutUser())
    } else {
      return response
    }
  }
}

export class ApiUtils {
  static listToDict(apiResponse: Array<{id: number; [key: string]: any}>) {
    var d: {[key: number]: any} = {}
    apiResponse.forEach((resource) => {
      d[resource.id] = resource
    })
    return d
  }
}
