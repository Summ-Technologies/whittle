import React from 'react'
import {Col} from 'react-bootstrap'
import {WhittleArticle} from '../../models/whittle'
import HelperPanel from '../articles/HelperPanel'
import Row from '../common/Row'
import Body from './Body'
import Header, {HeaderTabs} from './Header'

type OutlineHeaderBodyProps = {
  article?: WhittleArticle
  hidden?: boolean
  activeTab: HeaderTabs | undefined
  inboxCount: number
  queueCount: number
  libraryCount: number
  onSelectTab: (tab: HeaderTabs) => void
  onClickHome: () => void
}

export default function OutlineHeaderBody(
  props: React.PropsWithChildren<OutlineHeaderBodyProps>
) {
  return (
    <Body>
      <Header
        inboxCount={props.inboxCount}
        queueCount={props.queueCount}
        libraryCount={props.libraryCount}
        activeTab={props.activeTab}
        onSelectTab={props.onSelectTab}
        onClickHome={props.onClickHome}
      />
      <Row style={{height: '0', flex: '1 1 auto'}}>
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
