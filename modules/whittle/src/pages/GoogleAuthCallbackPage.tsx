import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import CallbackLoadingModal from '../components/google/CallbackLoadingModal'
import {
  googleLoginCallback,
  googleSignupCallback,
  postGoogleAuthCallback,
} from '../store/actions/user'

type GoogleAuthCallbackPageProps = RouteComponentProps<{type: string}>

function GoogleAuthCallbackPage(props: GoogleAuthCallbackPageProps) {
  let dispatch = useDispatch()
  let [loadingComponent, setLoadingComponent] = useState<
    JSX.Element | undefined
  >(undefined)

  useEffect(() => {
    switch (props.match.params.type.toLowerCase()) {
      case 'login':
        dispatch(googleLoginCallback(window.location.href))
        setLoadingComponent(
          <CallbackLoadingModal
            text={['Hold tight!', "We're logging you in"]}
            includeLoadingDots
          />
        )
        break
      case 'signup':
        dispatch(googleSignupCallback(window.location.href))
        setLoadingComponent(
          <CallbackLoadingModal
            text={['Hold tight!', "We're signing you up"]}
            includeLoadingDots
          />
        )
        break
      case 'gmail':
        dispatch(postGoogleAuthCallback(window.location.href))
        setLoadingComponent(
          <CallbackLoadingModal
            text={[
              'Hang on, we’re auto-importing your newsletters.',
              'If we missed any, you can easily add them in the lefthand settings panel.',
            ]}
            includeLoadingDots
          />
        )
        break
    }
  }, [dispatch, props.match.params.type])

  return <Body>{loadingComponent}</Body>
}

export default withRouter(GoogleAuthCallbackPage)
