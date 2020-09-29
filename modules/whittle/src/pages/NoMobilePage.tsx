import React, {CSSProperties} from 'react'
import Col from 'react-bootstrap/Col'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import Row from '../components/common/Row'
import whittleLogo from '../imgs/whittle-logo.png'
import defaultStyles from '../styles'

function NoMobilePage() {
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
      marginTop: 100,
      padding: 20,
      backgroundColor: defaultStyles.colors.white,
    },
    bodyLine: {
      textAlign: 'center',
      ...defaultStyles.body,
      fontSize: '1.0em',
      paddingBottom: 5,
    },
    title: {
      ...defaultStyles.header,
      fontSize: '1.5em',
      textAlign: 'center',
      marginBottom: 10,
    },
    logo: {
      width: 200,
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
          <div style={styles.title}>Mobile-friendly Whittle coming soon!</div>
          <div style={styles.bodyTextContainer}>
            <div style={styles.bodyLine}>
              Whittle currently only works on desktop.
            </div>
            <div style={styles.bodyLine}>
              We'll keep you updated when a mobile version is ready!
            </div>
          </div>
        </Col>
      </Row>
    </Body>
  )
}

export default withRouter(NoMobilePage)
