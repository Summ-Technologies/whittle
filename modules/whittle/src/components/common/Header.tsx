import React from 'react'
import {Col, Row} from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import HeaderTab from './HeaderTab'

export default function Header(props: React.PropsWithChildren<{}>) {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Whittle</h2>
        </Col>
        <Col>
          <HeaderTab title={'Inbox'} count={3} active={true} />
        </Col>
        <Col>
          <HeaderTab title={'Queue'} count={3} active={true} />
        </Col>
        <Col>
          <HeaderTab title={'Library'} count={3} active={true} />
        </Col>
      </Row>
    </Container>
  )
}
