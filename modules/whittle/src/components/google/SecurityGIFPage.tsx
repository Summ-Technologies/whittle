import React, {CSSProperties} from 'react'
import {Modal} from 'react-bootstrap'
import unverifiedGoogleLoginGif from '../../imgs/unverified-google-login.gif'
import whittleLogo from '../../imgs/whittle-logo.png'
import defaultStyles from '../../styles'
import Button from '../common/Button'

type SecurityGIFPageProps = {
  onConfirm: () => void
}
export default function SecurityGIFPage(props: SecurityGIFPageProps) {
  let styles: {[key: string]: CSSProperties} = {
    modalBody: {
      textAlign: 'center',
      padding: 20,
    },
    headerImg: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '55%',
      maxHeight: '30%',
      marginBottom: 15,
    },
    title: {
      ...defaultStyles.header,
      fontSize: '1.5em',
      marginBottom: 10,
    },
    gif: {
      ...defaultStyles.roundedCorners,
      ...defaultStyles.defaultBoxShadow,
      marginTop: 10,
      marginBottom: 20,
      width: '50%',
    },
    button: {
      cursor: 'pointer',
      height: 50,
      marginBottom: 5,
      display: 'inline-block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    bodyText: {
      ...defaultStyles.body,
      marginBottom: 20,
    },
  }

  return (
    <Modal size="lg" show>
      <div style={styles.modalBody}>
        <img style={styles.headerImg} src={whittleLogo} alt={'Whittle logo'} />
        <div style={styles.title}>
          Google verification delayed due to COVID-19
        </div>
        <div style={styles.boxyText}>
          Follow the gif below to auto-import your newsletters.
        </div>
        <div style={styles.boxyText}>
          Don't worry, we only store your newsletters. Never your personal
          email.
        </div>
        <img
          style={styles.gif}
          src={unverifiedGoogleLoginGif}
          alt={'security bypass gif'}
        />
        <br />
        <div style={styles.button}>
          <Button
            text="Continue to importing newsletters"
            onClick={props.onConfirm}
          />
        </div>
      </div>
    </Modal>
  )
}
