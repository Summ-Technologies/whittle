import React, {CSSProperties} from 'react'
import Col from 'react-bootstrap/Col'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import Button from '../components/common/Button'
import Row from '../components/common/Row'
import placeholderGIF from '../imgs/placeholder-gif.gif'
import whittleLogo from '../imgs/whittle-logo.png'
import defaultStyles from '../styles'

function SecurityGIFPage() {
  let styles: {[key: string]: CSSProperties} = {
    pageContainer: {
      width: '100%',
      height: '100%',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 'auto',
      paddingTop: '20px',
      paddingBottom: '20px',
      backgroundColor: defaultStyles.colors.white,
    },
    bodyLine: {
      textAlign: 'center',
      ...defaultStyles.body,
      fontSize: '1.2em',
      paddingBottom: 5,
    },
    title: {
      ...defaultStyles.header,
      fontSize: '1.5em',
      marginBottom: 10,
    },
    logo: {
      width: 300,
      paddingBottom: 20,
    },
    buttonContainer: {
      width: 200,
      height: 55,
      paddingTop: 25,
    },
    bodyTextContainer: {
      paddingTop: 12,
    },
    gif: {
      paddingTop: 24,
      width: 500,
    },
  }

  return (
    <Body>
      <Row style={styles.pageContainer}>
        <Col style={styles.container}>
          <img style={styles.logo} src={whittleLogo} alt={'Whittle logo'} />
          <div style={styles.title}>
            Google verification delayed due to COVID-19
          </div>
          <div style={styles.bodyTextContainer}>
            <div style={styles.bodyLine}>
              Follow the gif below to auto-import your newsletters.
            </div>
            <div style={styles.bodyLine}>
              Don't worry, we only store your newsletters. Never your personal
              email.
            </div>
          </div>
          <img
            style={styles.gif}
            src={placeholderGIF}
            alt={'security bypass gif'}
          />
          <div style={styles.buttonContainer}>
            <Button text="Import your newsletters" onClick={() => undefined} />
          </div>
        </Col>
      </Row>
    </Body>
  )
}

export default withRouter(SecurityGIFPage)
