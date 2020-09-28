import React, {CSSProperties, useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import hoveredGmailConnectIcon from '../../imgs/google-signin/btn_connect_gmail_dark_focus_web.png'
import gmailConnectIcon from '../../imgs/google-signin/btn_connect_gmail_dark_normal_web.png'
import clickedGmailConnectIcon from '../../imgs/google-signin/btn_connect_gmail_dark_pressed_web.png'
import defaultStyles from '../../styles'
import {imageNames, ImageUtils} from '../../util/image'

type OnboardingImportCTAProps = {
  onConnectGmail: () => void
}

export default function OnboardingImportCTA(props: OnboardingImportCTAProps) {
  let [hovered, setHovered] = useState(false)
  let [clicked, setClicked] = useState(false)
  let [img, setImg] = useState(gmailConnectIcon)
  useEffect(() => {
    let _img = gmailConnectIcon
    if (clicked) {
      _img = clickedGmailConnectIcon
    } else if (hovered) {
      _img = hoveredGmailConnectIcon
    }
    setImg(_img)
  }, [hovered, clicked, setImg])
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
    googleButton: {
      cursor: 'pointer',
      height: 50,
      marginBottom: 5,
    },
    bodyText: {
      ...defaultStyles.body,
      marginBottom: 20,
    },
  }
  return (
    <Modal show>
      <div style={styles.modalBody}>
        <img
          src={ImageUtils.getImageUrl(imageNames.personWithArticlePreview)}
          alt="Person sitting and reading article preview"
          style={styles.headerImg}
        />
        <div style={styles.title}>Now let's import your newsletters!</div>
        <div style={styles.bodyText}>We only organize your newsletters.</div>
        <div style={styles.bodyText}>Never your personal emails.</div>
        <img
          src={img}
          style={styles.googleButton}
          alt="Connect Google email account button"
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => {
            setHovered(false)
            setClicked(false)
          }}
          onClick={() => {
            setClicked(true)
            props.onConnectGmail()
          }}
        />
      </div>
    </Modal>
  )
}
