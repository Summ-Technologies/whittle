import React, {CSSProperties, useState} from 'react'
import Col from 'react-bootstrap/Col'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import hoveredGoogleLoginIcon from '../imgs/google-signin/btn_google_signin_light_focus_web.png'
import googleLoginIcon from '../imgs/google-signin/btn_google_signin_light_normal_web.png'
import clickedGoogleLoginIcon from '../imgs/google-signin/btn_google_signin_light_pressed_web.png'
import {googleLoginStep1} from '../store/actions/user'

function LoginPage() {
  let dispatch = useDispatch()
  let [hovered, setHovered] = useState(false)
  let [clicked, setClicked] = useState(false)

  function onClick() {
    dispatch(googleLoginStep1())
  }

  let img = googleLoginIcon
  if (clicked) {
    img = clickedGoogleLoginIcon
  } else if (hovered) {
    img = hoveredGoogleLoginIcon
  }

  return (
    <Body>
      <Col
        xs={{span: 10, offset: 1}}
        md={{span: 6, offset: 3}}
        style={styles.pageContainer}>
        <div style={styles.header}>Whittle</div>
        <div style={styles.button} onClick={onClick}>
          <img
            src={img}
            alt={'Sign in with Google button'}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => {
              setHovered(false)
              setClicked(false)
            }}
            onMouseDown={() => setClicked(true)}
            onMouseUp={() => setClicked(false)}
            style={styles.googleLogo}
          />
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
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  header: {
    fontWeight: 'bold',
    fontSize: '1.5em',
    marginBottom: '10px',
  },
  button: {
    cursor: 'pointer',
  },
}

export default withRouter(LoginPage)
