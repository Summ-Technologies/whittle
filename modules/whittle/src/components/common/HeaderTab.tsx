import React from 'react'
import {Col, Row} from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

type HeaderTabProps = {
  title: string
  count: number
  active: boolean
}

export default function HeaderTab(props: HeaderTabProps) {
  return (
    <Container>
      <Row>
        <Col>
          <h5>{props.title}</h5>
        </Col>
        <Col>
          <h5>{props.count}</h5>
        </Col>
      </Row>
    </Container>
  )
}
