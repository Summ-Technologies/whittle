import React, {useEffect} from 'react'
import {Spinner} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import {
  googleLoginCallback,
  googleSignupCallback,
  postGoogleAuthCallback,
} from '../store/actions/user'

type GoogleAuthCallbackPageProps = RouteComponentProps<{type: string}>

function GoogleAuthCallbackPage(props: GoogleAuthCallbackPageProps) {
  let dispatch = useDispatch()

  useEffect(() => {
    switch (props.match.params.type.toLowerCase()) {
      case 'login':
        dispatch(googleLoginCallback(window.location.href))
        break
      case 'signup':
        dispatch(googleSignupCallback(window.location.href))
        break
      case 'gmail':
        dispatch(postGoogleAuthCallback(window.location.href))
        break
    }
  }, [dispatch, props.match.params.type])

  return (
    <Body>
      <Spinner animation="border" />
    </Body>
  )
}

export default withRouter(GoogleAuthCallbackPage)
