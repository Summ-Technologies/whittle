import React, {useEffect, useState} from 'react'
import {Col} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {WhittleArticle, WhittleUser} from '../../models/whittle'
import {putConfigArchiveEmails} from '../../store/actions/user'
import {useUserConfig} from '../../util/hooks'
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
  showSearchBar: boolean
  setShowSearchBar: (show: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  redirectOutline: (articleId: number, uri: string) => void
  onSelectTab: (tab: HeaderTabs) => void
  onLogoutUser: () => void
  onAddNewsletterSubscription: (fromAddress: string) => void
}

export default function OutlineHeaderBody(
  props: React.PropsWithChildren<OutlineHeaderBodyProps>
) {
  let dispatch = useDispatch()
  let userConfig = useUserConfig()

  let [sidebarActive, setSidebarActive] = useState(false)
  let [gmailArchiveSettingActive, setGmailArchiveSettingActive] = useState(
    false
  )

  function updateConfigAutoArchive(doArchive: boolean): void {
    setGmailArchiveSettingActive(doArchive)
    dispatch(putConfigArchiveEmails(doArchive))
  }

  useEffect(() => {
    if (userConfig) {
      setGmailArchiveSettingActive(userConfig.gmail_auto_archive)
    }
  }, [userConfig])

  return (
    <Body>
      <Row style={{height: '0', flex: '1 1 auto'}}>
        <Col
          xs={8}
          style={{
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Header
            inboxCount={props.inboxCount}
            queueCount={props.queueCount}
            libraryCount={props.libraryCount}
            activeTab={props.activeTab}
            showSearchBar={props.showSearchBar}
            setShowSearchBar={props.setShowSearchBar}
            searchQuery={props.searchQuery}
            setSearchQuery={props.setSearchQuery}
            onSelectTab={props.onSelectTab}
            onClickMenu={() => setSidebarActive(!sidebarActive)}
          />
          <div style={{flexGrow: 1, overflow: 'scroll', height: '100%'}}>
            <Sidebar
              active={sidebarActive}
              onLogout={props.onLogoutUser}
              userEmail={props.user ? props.user.email : ''}
              userFirstName={props.user ? props.user.first_name : ''}
              userLastName={props.user ? props.user.last_name : ''}
              gmailArchiveSettingActive={gmailArchiveSettingActive}
              onAddNewsletterSubscription={props.onAddNewsletterSubscription}
              onToggleGmailArchive={() =>
                updateConfigAutoArchive(!gmailArchiveSettingActive)
              }
            />
            {props.children}
          </div>
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
