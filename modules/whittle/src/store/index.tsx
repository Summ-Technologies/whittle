import {applyMiddleware, combineReducers, createStore} from 'redux'
import {apiMiddleware} from 'redux-api-middleware'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'

const reducer = combineReducers(reducers)
export type RootState = ReturnType<typeof reducer>
const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware(apiMiddleware, thunk)
)(createStore)

export default createStoreWithMiddleware(reducer)
