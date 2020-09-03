import {ConnectedRouter} from 'connected-react-router'
import React from 'react'
import {Provider} from 'react-redux'
import Stack from './stacks'
import store, {history} from './store'

export default function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Stack />
      </ConnectedRouter>
    </Provider>
  )
}
