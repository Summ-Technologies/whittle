import React, {CSSProperties, ReactElement} from 'react'
import {OverlayChildren} from 'react-bootstrap/esm/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {FaPlus} from 'react-icons/fa'
import Row from './Row'

type HeaderProps = {
  inboxCount: number
  queueCount: number
  libraryCount: number
  activeTab?: HeaderTabs
  onSelectTab: (tab: HeaderTabs) => void
  onClickHome: () => void
}

export const HeaderTabs = ['inbox', 'queue', 'library'] as const
export type HeaderTabs = typeof HeaderTabs[number]

const styles: {[key: string]: CSSProperties} = {
  headerTab: {
    fontWeight: 600,
    color: '#979797',
    paddingLeft: 12,
    paddingRight: 12,
    cursor: 'pointer',
  },
  headerTabActive: {color: '#000000'},
  boxesContainer: {
    paddingLeft: 25,
    paddingBottom: 7,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
}

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
  return (
    <Row
      style={{
        alignItems: 'flex-end',
        margin: 0,
        borderBottom: '1px solid #dee2e6',
        paddingLeft: '15px',
      }}>
      <HeaderTitle name="Whittle" onClick={props.onClickHome} />
      <div style={styles.boxesContainer}>
        <HeaderTab
          title={'Inbox'}
          count={props.inboxCount}
          active={props.activeTab === 'inbox'}
          onClick={() => props.onSelectTab('inbox')}
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

type HeaderTitleProps = {
  name: string
  onClick: () => void
}

function HeaderTitle(props: HeaderTitleProps) {
  return (
    <div
      style={{fontSize: '2em', fontWeight: 600, cursor: 'pointer'}}
      onClick={props.onClick}>
      Whittle
    </div>
  )
}

type HeaderTabProps = {
  title: string
  count: number
  active: boolean
  onClick: () => void
}
function HeaderTab(props: HeaderTabProps) {
  return (
    <div
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
