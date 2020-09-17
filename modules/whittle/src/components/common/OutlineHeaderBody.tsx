import React, {useState} from 'react'
import {Col} from 'react-bootstrap'
import {WhittleArticle} from '../../models/whittle'
import HelperPanel from '../articles/HelperPanel'
import Row from '../common/Row'
import Body from './Body'
import Header, {HeaderTabs} from './Header'
import Sidebar from './Sidebar'

type OutlineHeaderBodyProps = {
  article?: WhittleArticle
  hidden?: boolean
  activeTab: HeaderTabs | undefined
  inboxCount: number
  queueCount: number
  libraryCount: number
  onSelectTab: (tab: HeaderTabs) => void
}

export default function OutlineHeaderBody(
  props: React.PropsWithChildren<OutlineHeaderBodyProps>
) {
  let [sidebarActive, setSidebarActive] = useState(false)
  let [gmailArchiveSettingActive, setGmailArchiveSettingActive] = useState(
    false
  )
  return (
    <Body>
      <Header
        inboxCount={props.inboxCount}
        queueCount={props.queueCount}
        libraryCount={props.libraryCount}
        activeTab={props.activeTab}
        onSelectTab={props.onSelectTab}
        onClickMenu={() => setSidebarActive(!sidebarActive)}
      />

      <Row style={{height: '0', flex: '1 1 auto'}}>
        <Sidebar
          active={sidebarActive}
          onLogout={() => undefined}
          userEmail={'jred0011@gmail.com'}
          userFirstName={'Jared'}
          userLastName={'Hanson'}
          gmailArchiveSettingActive={gmailArchiveSettingActive}
          onAddNewsletterSubscription={() => undefined}
          onToggleGmailArchive={() =>
            setGmailArchiveSettingActive(!gmailArchiveSettingActive)
          }
        />
        <Col xs={8} style={{height: '100%', overflow: 'scroll'}}>
          {props.children}
        </Col>
        <Col xs={4} style={{height: '100%', overflow: 'scroll'}}>
          <HelperPanel article={props.article} />
        </Col>
      </Row>
    </Body>
  )
}
