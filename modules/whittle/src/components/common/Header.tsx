import React from 'react'
import {Row} from 'react-bootstrap'
import {WhittleBox} from '../../models/whittle'

type HeaderProps = {
  inbox: WhittleBox | undefined
  queue: WhittleBox | undefined
  library: WhittleBox | undefined
  activeTab: HeaderTabs
  onSelectTab: (tab: HeaderTabs) => void
}

export type HeaderTabs = 'inbox' | 'queue' | 'library'

export default function Header(props: HeaderProps) {
  function getArticleCount(box: WhittleBox): number {
    return box && box.articles ? box.articles.length : 0
  }
  return (
    <Row>
      <HeaderTitle name="Whittle" />
      <HeaderTab
        title={props.inbox ? props.inbox.name : 'Inbox'}
        count={props.inbox ? getArticleCount(props.inbox) : 0}
        active={props.activeTab === 'inbox'}
      />
      <HeaderTab
        title={props.queue ? props.queue.name : 'Queue'}
        count={props.queue ? getArticleCount(props.queue) : 0}
        active={props.activeTab === 'queue'}
      />
      <HeaderTab
        title={props.library ? props.library.name : 'Library'}
        count={props.library ? getArticleCount(props.library) : 0}
        active={props.activeTab === 'library'}
      />
    </Row>
  )
}

type HeaderTitleProps = {
  name: string
}

function HeaderTitle(props: HeaderTitleProps) {
  return <div style={{fontSize: '2em'}}>Whittle</div>
}

type HeaderTabProps = {
  title: string
  count: number
  active: boolean
}
function HeaderTab(props: HeaderTabProps) {
  return <div>{`${props.title} ${props.count}`}</div>
}
