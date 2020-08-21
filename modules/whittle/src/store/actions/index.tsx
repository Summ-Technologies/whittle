import {RSAARequestAction, RSAAResultAction} from 'redux-api-middleware'

export type WhittleAction =
  | RSAAResultAction<any, any>
  | RSAARequestAction<any, any>
