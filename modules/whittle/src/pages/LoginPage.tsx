import React, {CSSProperties, useState} from 'react'
import Col from 'react-bootstrap/Col'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import hoveredGoogleLoginIcon from '../imgs/google-signin/btn_google_signup_dark_focus_web.png'
import googleLoginIcon from '../imgs/google-signin/btn_google_signup_dark_normal_web.png'
import clickedGoogleLoginIcon from '../imgs/google-signin/btn_google_signup_dark_pressed_web.png'
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
          onClick={onClick}
        />
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
