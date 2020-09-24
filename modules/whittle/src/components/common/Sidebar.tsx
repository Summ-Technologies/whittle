import React, {CSSProperties, useState} from 'react'
import {Col} from 'react-bootstrap'
import defaultStyles from '../../styles'
import Button from './Button'
import Row from './Row'
import TextInput from './TextInput'
import Toggle from './Toggle'
import UserIcon from './UserIcon'

type SidebarProps = {
  active: boolean
  userEmail: string
  userFirstName: string
  userLastName: string
  gmailArchiveSettingActive: boolean
  onToggleGmailArchive: () => void
  onLogout: () => void
  onAddNewsletterSubscription: (fromAddress: string) => void
}

export default function Sidebar(props: SidebarProps) {
  let [newSubscription, setNewSubscription] = useState('')
  let styles: {[key: string]: CSSProperties} = {
    container: {
      zIndex: 1,
      display: 'none',
      position: 'fixed',
      width: '100%',
      height: '100%',
    },
    containerActive: {display: 'unset'},
    sidebar: {
      backgroundColor: defaultStyles.colors.white,
      height: '100%',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderRightColor: defaultStyles.colors.grey,
      borderRightStyle: 'solid',
      borderRightWidth: defaultStyles.defaultBorderWidth,
      paddingTop: 10,
    },
    userInfoRow: {
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
    },
    userInfo: {
      width: 0, // make ellipsis work (doesn't work when width is auto)
      paddingLeft: '30px',
      fontWeight: 'bold',
    },
    header2: {
      ...defaultStyles.header2,
    },
    bodyText: {
      fontSize: '.9em',
    },
    subscriptionText: {
      paddingBottom: 10,
    },
    subscriptionInputRow: {
      flexWrap: 'nowrap',
    },
    subscriptionInputContainer: {
      height: 40,
      flexGrow: 2,
    },
    subscriptionSubmitContainer: {
      minWidth: '20%',
      paddingLeft: 10,
    },
    logoutButton: {
      width: '30%',
      height: 35,
    },
    settingsToggleRow: {
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 15,
    },
    settingsToggleRowText: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    supportText: {
      paddingTop: 15,
    },
  }
  return (
    <div
      style={{
        ...styles.container,
        ...(props.active ? styles.containerActive : {}),
      }}>
      <Col
        xs={{span: 12}}
        md={{span: 6}}
        lg={{span: 4}}
        xl={{span: 3}}
        style={styles.sidebar}>
        <Row style={styles.userInfoRow}>
          <UserIcon
            firstName={props.userFirstName}
            color={defaultStyles.colors.main}
          />
          <Col style={styles.userInfo}>
            <div
              style={
                defaultStyles.ellipsisOverflow
              }>{`${props.userFirstName} ${props.userLastName}`}</div>
            <div style={defaultStyles.ellipsisOverflow}>{props.userEmail}</div>
          </Col>
        </Row>
        <hr />
        <div style={styles.header2}>Subscriptions</div>
        <div style={{...styles.bodyText, ...styles.subscriptionText}}>
          Did we miss a newsletter? Enter the{' '}
          <b>
            <i>from address</i>
          </b>{' '}
          and we will auto-import the next newsletter they send you.
        </div>
        <Row style={styles.subscriptionInputRow}>
          <div style={styles.subscriptionInputContainer}>
            <TextInput
              placeholder='Newsletter "from address"'
              value={newSubscription}
              onChangeValue={setNewSubscription}
            />
          </div>
          <div style={styles.subscriptionSubmitContainer}>
            <Button text="Submit" onClick={() => undefined} />
          </div>
        </Row>
        <hr />
        <div style={styles.header2}>Settings</div>
        <Row style={styles.settingsToggleRow}>
          <div style={{...styles.settingsToggleRowText, ...styles.bodyText}}>
            Archive in Gmail after action
          </div>
          <Toggle
            onClick={props.onToggleGmailArchive}
            active={props.gmailArchiveSettingActive}
          />
        </Row>
        <div style={styles.logoutButton}>
          <Button text="Logout" onClick={props.onLogout} />
        </div>
        <div style={{...styles.bodyText, ...styles.supportText}}>
          Need help? Contact us at: <b>support@usewhittle.com</b>
        </div>
      </Col>
    </div>
  )
}
