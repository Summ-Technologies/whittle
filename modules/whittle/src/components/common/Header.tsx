import React, {CSSProperties} from 'react'
import {FaBars} from 'react-icons/fa'
import defaultStyles from '../../styles'
import Row from './Row'

type HeaderProps = {
  inboxCount: number
  queueCount: number
  libraryCount: number
  activeTab?: HeaderTabs
  onSelectTab: (tab: HeaderTabs) => void
  onClickMenu: () => void
}

export const HeaderTabs = ['inbox', 'queue', 'library'] as const
export type HeaderTabs = typeof HeaderTabs[number]

export default function Header(props: HeaderProps) {
  // Styling
  const headerHeightPx = 50
  const menuIconPaddingPx = 10
  const styles: {[key: string]: CSSProperties} = {
    container: {
      alignItems: 'flex-end',
      margin: 0,
      borderBottomStyle: 'solid',
      borderBottomColor: defaultStyles.colors.grey,
      borderBottomWidth: defaultStyles.defaultBorderWidth,
      height: `${headerHeightPx}px`,
      color: defaultStyles.colors.grey,
    },
    menuIconContainer: {
      paddingLeft: `${menuIconPaddingPx}px`,
      paddingRight: `${menuIconPaddingPx}px`,
      paddingTop: `${menuIconPaddingPx}px`,
      paddingBottom: `${menuIconPaddingPx}px`,
      height: '100%',
      cursor: 'pointer',
    },
    menuIcon: {
      height: 22,
      width: 22,
    },
    boxesContainer: {
      marginTop: 'auto',
      marginBottom: 'auto',
      flexDirection: 'row',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    boxTab: {
      fontWeight: 600,
      paddingLeft: 12,
      paddingRight: 12,
      cursor: 'pointer',
    },
    boxTabActive: {color: defaultStyles.colors.black},
  }
  return (
    <Row style={styles.container}>
      <div style={styles.menuIconContainer} onClick={props.onClickMenu}>
        <FaBars style={styles.menuIcon} />
      </div>
      <div style={styles.boxesContainer}>
        <div
          className="joyride-inbox"
          style={
            props.activeTab === 'inbox'
              ? {...styles.boxTab, ...styles.boxTabActive}
              : styles.boxTab
          }
          onClick={() =>
            props.onSelectTab('inbox')
          }>{`Inbox ${props.inboxCount}`}</div>
        <div
          className="joyride-queue"
          style={
            props.activeTab === 'queue'
              ? {...styles.boxTab, ...styles.boxTabActive}
              : styles.boxTab
          }
          onClick={() =>
            props.onSelectTab('queue')
          }>{`Queue ${props.queueCount}`}</div>
        <div
          className="joyride-library"
          style={
            props.activeTab === 'library'
              ? {...styles.boxTab, ...styles.boxTabActive}
              : styles.boxTab
          }
          onClick={() => props.onSelectTab('library')}>{`Library`}</div>
        <div style={{width: 10}}></div>
      </div>
    </Row>
  )
}
