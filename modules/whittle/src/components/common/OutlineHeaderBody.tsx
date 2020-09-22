import React, {useState} from 'react'
import {Col} from 'react-bootstrap'
import {WhittleArticle, WhittleUser} from '../../models/whittle'
import HelperPanel from '../articles/HelperPanel'
import Row from '../common/Row'
import Body from './Body'
import Header, {HeaderTabs} from './Header'
import Sidebar from './Sidebar'

type OutlineHeaderBodyProps = {
  article?: WhittleArticle
  user?: WhittleUser
  hidden?: boolean
  activeTab: HeaderTabs | undefined
  inboxCount: number
  queueCount: number
  libraryCount: number
  redirectOutline: (articleId: number, uri: string) => void
  onSelectTab: (tab: HeaderTabs) => void
  onLogoutUser: () => void
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
      <Row style={{height: '0', flex: '1 1 auto'}}>
        <Col xs={8} style={{height: '100%', overflow: 'scroll'}}>
          <Header
            inboxCount={props.inboxCount}
            queueCount={props.queueCount}
            libraryCount={props.libraryCount}
            activeTab={props.activeTab}
            onSelectTab={props.onSelectTab}
            onClickMenu={() => setSidebarActive(!sidebarActive)}
          />
          <Sidebar
            active={sidebarActive}
            onLogout={props.onLogoutUser}
            userEmail={props.user ? props.user.email : ''}
            userFirstName={props.user ? props.user.first_name : ''}
            userLastName={props.user ? props.user.last_name : ''}
            gmailArchiveSettingActive={gmailArchiveSettingActive}
            onAddNewsletterSubscription={() => undefined}
            onToggleGmailArchive={() =>
              setGmailArchiveSettingActive(!gmailArchiveSettingActive)
            }
          />
          {props.children}
        </Col>
        <Col xs={4} style={{height: '100%', overflow: 'scroll'}}>
          <HelperPanel
            article={props.article}
            redirectOutline={props.redirectOutline}
          />
        </Col>
      </Row>
    </Body>
  )
}
