import React, {CSSProperties, ReactElement} from 'react'
import {OverlayChildren} from 'react-bootstrap/esm/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {FaBars, FaPlus} from 'react-icons/fa'
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
  function simpleTooltip(val: string): OverlayChildren {
    return <Tooltip id="button-tooltip">{val}</Tooltip>
  }
  function simpleOverlay(val: string) {
    return (children: ReactElement) => (
      <OverlayTrigger
        placement="bottom"
        delay={{show: 150, hide: 150}}
        overlay={simpleTooltip(val)}>
        {children}
      </OverlayTrigger>
    )
  }

  // Styling
  const headerHeightPx = 50
  const menuIconPaddingPx = 10
  const styles: {[key: string]: CSSProperties} = {
    container: {
      alignItems: 'flex-end',
      margin: 0,
      borderBottom: '1px solid #dee2e6',
      height: `${headerHeightPx}px`,
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
      height: `${headerHeightPx - menuIconPaddingPx * 2}px`,
      width: `${headerHeightPx - menuIconPaddingPx * 2}px`,
    },
    boxesContainer: {
      paddingLeft: 5,
      paddingBottom: 7,
      flexDirection: 'row',
      display: 'flex',
      alignItems: 'center',
    },
  }
  return (
    <Row style={styles.container}>
      <div style={styles.menuIconContainer} onClick={props.onClickMenu}>
        <FaBars style={styles.menuIcon} />
      </div>
      <div style={styles.boxesContainer}>
        <HeaderTab
          title={'Inbox'}
          count={props.inboxCount}
          active={props.activeTab === 'inbox'}
          onClick={() => props.onSelectTab('inbox')}
          className="joyride-inbox"
        />
        <HeaderTab
          title={'Queue'}
          count={props.queueCount}
          active={props.activeTab === 'queue'}
          onClick={() => props.onSelectTab('queue')}
        />
        <HeaderTab
          title={'Library'}
          count={props.libraryCount}
          active={props.activeTab === 'library'}
          onClick={() => props.onSelectTab('library')}
        />
        <div style={{width: 10}}></div>
        {simpleOverlay('New box')(<FaPlus size={16} color="#c4c4c4" />)}
      </div>
    </Row>
  )
}

type HeaderTabProps = {
  title: string
  count: number
  active: boolean
  className?: string
  onClick: () => void
}
function HeaderTab(props: HeaderTabProps) {
  let styles: {[key: string]: CSSProperties} = {
    headerTab: {
      fontWeight: 600,
      color: '#979797',
      paddingLeft: 12,
      paddingRight: 12,
      fontFamily: 'Inter',
      cursor: 'pointer',
    },
    headerTabActive: {color: '#000000'},
  }
  return (
    <div
      className={props.className}
      style={
        props.active
          ? {...styles.headerTab, ...styles.headerTabActive}
          : styles.headerTab
      }
      onClick={(event) =>
        props.onClick()
      }>{`${props.title} ${props.count}`}</div>
  )
}
