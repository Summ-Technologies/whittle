import React from 'react'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'

function HomePage() {
  return (
    <Body>
      <h1>HomePage</h1>
    </Body>
  )
}

export default withRouter(HomePage)
