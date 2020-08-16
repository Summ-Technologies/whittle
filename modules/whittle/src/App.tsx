import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import Stack from './stacks'
import store from './store'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Stack />
      </Router>
    </Provider>
  )
}
