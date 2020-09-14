import React, {CSSProperties, useEffect, useState} from 'react'
import Col from 'react-bootstrap/Col'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import hoveredGoogleLoginIcon from '../imgs/google-signin/btn_google_signin_dark_focus_web.png'
import googleLoginIcon from '../imgs/google-signin/btn_google_signin_dark_normal_web.png'
import clickedGoogleLoginIcon from '../imgs/google-signin/btn_google_signin_dark_pressed_web.png'
import hoveredGoogleSignupIcon from '../imgs/google-signin/btn_google_signup_dark_focus_web.png'
import googleSignupIcon from '../imgs/google-signin/btn_google_signup_dark_normal_web.png'
import clickedGoogleSignupIcon from '../imgs/google-signin/btn_google_signup_dark_pressed_web.png'
import {googleLoginStep1, googleSignupStep1} from '../store/actions/user'

type AuthType = 'login' | 'signup'

function LoginPage() {
  let dispatch = useDispatch()
  let [authType, setAuthType] = useState<AuthType>('signup')
  let [hovered, setHovered] = useState(false)
  let [clicked, setClicked] = useState(false)
  let [img, setImg] = useState(googleSignupIcon)

  useEffect(() => {
    let buttons: [string, string, string] =
      authType === 'login'
        ? [googleLoginIcon, hoveredGoogleLoginIcon, clickedGoogleLoginIcon]
        : [googleSignupIcon, hoveredGoogleSignupIcon, clickedGoogleSignupIcon]
    let _img = buttons[0]
    if (clicked) {
      _img = buttons[2]
    } else if (hovered) {
      _img = buttons[1]
    }
    setImg(_img)
  }, [authType, hovered, clicked, setImg])

  function onClickGoogleButton() {
    if (authType === 'login') {
      dispatch(googleLoginStep1())
    } else if (authType === 'signup') {
      dispatch(googleSignupStep1())
    }
  }

  function toggleAuthType() {
    let newAuthType: AuthType = authType === 'login' ? 'signup' : 'login'
    setAuthType(newAuthType)
    setHovered(false)
    setClicked(false)
  }

  return (
    <Body>
      <Col
        xs={{span: 10, offset: 1}}
        md={{span: 6, offset: 3}}
        style={styles.pageContainer}>
        {/* <img style={{width: 243, height: 80}} src={newsletterImg} /> */}
        <div style={styles.header}>Whittle</div>
        <div style={styles.bodyLine}>
          Automatically import your newsletters.
        </div>
        <div style={styles.bodyLine}></div>
        <div style={styles.bodyLine}>Skim less. Read more.</div>
        <img
          src={img}
          alt={'Sign up with Google button'}
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => {
            setHovered(false)
            setClicked(false)
          }}
          onMouseDown={() => setClicked(true)}
          onMouseUp={() => setClicked(false)}
          style={styles.button}
          onClick={onClickGoogleButton}
        />
        <div style={{cursor: 'pointer'}} onClick={toggleAuthType}>
          {authType === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}
        </div>
      </Col>
    </Body>
  )
}

const styles: {[key: string]: CSSProperties} = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '2px 2px rgba(0, 0,0, .4)',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '3px',
    backgroundColor: 'rgba(200, 200, 200, .4)',
  },
  bodyLine: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: '1.5em',
  },
  header: {
    fontWeight: 'bold',
    fontFamily: 'Inter',
    fontSize: '3em',
    marginBottom: '10px',
  },
  button: {
    marginTop: '20px',
    height: '60px',
    cursor: 'pointer',
  },
}

export default withRouter(LoginPage)
