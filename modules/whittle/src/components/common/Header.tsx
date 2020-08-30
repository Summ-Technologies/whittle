import React, {CSSProperties, ReactElement} from 'react'
import {Row} from 'react-bootstrap'
import {OverlayChildren} from 'react-bootstrap/esm/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {FaPlus} from 'react-icons/fa'
import {WhittleBox} from '../../models/whittle'

type HeaderProps = {
  inbox: WhittleBox | undefined
  queue: WhittleBox | undefined
  library: WhittleBox | undefined
  activeTab?: HeaderTabs
  onSelectTab: (tab: HeaderTabs) => void
}

export const HeaderTabs = ['inbox', 'queue', 'library'] as const
export type HeaderTabs = typeof HeaderTabs[number]

const styles: {[key: string]: CSSProperties} = {
  headerTab: {
    fontWeight: 'bold',
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
  function getArticleCount(box: WhittleBox): number {
    return box && box.articles ? box.articles.length : 0
  }
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
      <HeaderTitle name="Whittle" />
      <div style={styles.boxesContainer}>
        <HeaderTab
          title={props.inbox ? props.inbox.name : 'Inbox'}
          count={props.inbox ? getArticleCount(props.inbox) : 0}
          active={props.activeTab === 'inbox'}
          onClick={() => props.onSelectTab('inbox')}
        />
        <HeaderTab
          title={props.queue ? props.queue.name : 'Queue'}
          count={props.queue ? getArticleCount(props.queue) : 0}
          active={props.activeTab === 'queue'}
          onClick={() => props.onSelectTab('queue')}
        />
        <HeaderTab
          title={props.library ? props.library.name : 'Library'}
          count={props.library ? getArticleCount(props.library) : 0}
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
}

function HeaderTitle(props: HeaderTitleProps) {
  return <div style={{fontSize: '2em', fontWeight: 'bold'}}>Whittle</div>
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
