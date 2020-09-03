import React from 'react'
import Button from 'react-bootstrap/Button'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import {connectGoogleAccountStep1} from '../store/actions/user'

function AccountPage() {
  let dispatch = useDispatch()

  function onClick() {
    dispatch(connectGoogleAccountStep1())
  }

  return (
    <Body>
      <Button onClick={onClick}>Connect Google Account?</Button>
    </Body>
  )
}

export default withRouter(AccountPage)
