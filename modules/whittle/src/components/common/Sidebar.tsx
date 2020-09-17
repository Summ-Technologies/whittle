import React, {CSSProperties} from 'react'
import {Col} from 'react-bootstrap'
import defaultStyles from '../../styles'
import Button from './Button'
import Row from './Row'
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
      paddingLeft: '30px',
      paddingRight: '30px',
      borderRightColor: defaultStyles.colors.grey,
      borderRightStyle: 'solid',
      borderRightWidth: defaultStyles.defaultBorderWidth,
    },
    userInfo: {
      paddingLeft: '30px',
    },
    logoutButton: {
      width: '30%',
    },
  }
  return (
    <div
      style={{
        ...styles.container,
        ...(props.active ? styles.containerActive : {}),
      }}>
      <Col xs={{span: 12}} md={{span: 4}} lg={{span: 3}} style={styles.sidebar}>
        <Row>
          <UserIcon firstName={'Jared'} color={defaultStyles.colors.main} />
          <Col style={styles.userInfo}>
            <div>{`${props.userFirstName} ${props.userLastName}`}</div>
            <div>{props.userEmail}</div>
          </Col>
        </Row>
        <div style={defaultStyles.header2}>Add newsletter subscription</div>
        <div>
          Did we miss a newsletter? Enter the{' '}
          <b>
            <i>from address</i>
          </b>{' '}
          and we will auto-import the next newsletter they send you.
        </div>
        <Row>
          <input type="text" style={{flexGrow: 2}} />
          <Button text="Submit" onClick={() => undefined} />
        </Row>
        <hr />
        <div style={defaultStyles.header2}>Settings</div>
        <Row>
          <div>Archive in Gmail after action</div>
          <Toggle
            onClick={props.onToggleGmailArchive}
            active={props.gmailArchiveSettingActive}
          />
        </Row>
        <div style={styles.logoutButton}>
          <Button text="Logout" onClick={() => undefined} />
        </div>
      </Col>
    </div>
  )
}
