import React, {CSSProperties, useEffect, useState} from 'react'
import Col from 'react-bootstrap/Col'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import Link from '../components/common/Link'
import Row from '../components/common/Row'
import hoveredGoogleLoginIcon from '../imgs/google-signin/btn_google_signin_dark_focus_web.png'
import googleLoginIcon from '../imgs/google-signin/btn_google_signin_dark_normal_web.png'
import clickedGoogleLoginIcon from '../imgs/google-signin/btn_google_signin_dark_pressed_web.png'
import hoveredGoogleSignupIcon from '../imgs/google-signin/btn_google_signup_dark_focus_web.png'
import googleSignupIcon from '../imgs/google-signin/btn_google_signup_dark_normal_web.png'
import clickedGoogleSignupIcon from '../imgs/google-signin/btn_google_signup_dark_pressed_web.png'
import whittleLogo from '../imgs/whittle-logo.png'
import {googleLoginStep1, googleSignupStep1} from '../store/actions/user'
import defaultStyles from '../styles'
import {imageNames, ImageUtils} from '../util/image'

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

  let styles: {[key: string]: CSSProperties} = {
    pageContainer: {
      backgroundImage: `url(${ImageUtils.getImageUrl(
        imageNames.treesCloudsSunBackground
      )})`,
      backgroundPosition: 'center bottom',
      backgroundAttachment: 'fixed',
      width: '100%',
      height: '100%',
    },
    modalContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
      paddingTop: '20px',
      paddingBottom: '20px',
      ...defaultStyles.defaultBoxShadow,
      ...defaultStyles.roundedCorners,
      backgroundColor: defaultStyles.colors.white,
    },
    bodyLine: {
      textAlign: 'center',
      ...defaultStyles.body,
      fontSize: '1.2em',
      paddingBottom: 5,
    },
    button: {
      marginTop: 15,
      marginBottom: 5,
      height: 60,
      cursor: 'pointer',
    },
    logo: {
      width: 300,
      paddingBottom: 20,
    },
  }

  return (
    <Body>
      <Row style={styles.pageContainer}>
        <Col
          xs={{span: 10, offset: 1}}
          md={{span: 6, offset: 3}}
          lg={{span: 4, offset: 4}}
          style={styles.modalContainer}>
          <img style={styles.logo} src={whittleLogo} alt={'Whittle logo'} />
          {authType === 'signup' ? (
            <>
              <div style={styles.bodyLine}>
                Take control of your newsletters.
              </div>
              <div style={styles.bodyLine}>Stress less. Read more.</div>
            </>
          ) : (
            <div style={styles.bodyLine}>Welcome back!</div>
          )}
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
          <Link
            color={defaultStyles.colors.blueLink}
            text={
              authType === 'signup'
                ? 'Already have an account?'
                : "Don't have an account?"
            }
            onClick={toggleAuthType}
          />
        </Col>
      </Row>
    </Body>
  )
}

export default withRouter(LoginPage)
