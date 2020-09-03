import React, {useEffect} from 'react'
import {Spinner} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import {postGoogleAuthCallback} from '../store/actions/user'

function GoogleAuthCallbackPage() {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(postGoogleAuthCallback(window.location.href))
  }, [dispatch])

  return (
    <Body>
      <Spinner animation="border" />
    </Body>
  )
}

export default withRouter(GoogleAuthCallbackPage)
