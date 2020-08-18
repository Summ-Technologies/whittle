import React from 'react'
import {Col, Row} from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import TriageButtonsGroup from './TriageButtonsGroup'

type ReadingHeaderProps = {
  readingMins: number
  author: String
  publication: String
  title: String
}

export default function ReadingHeader(props: ReadingHeaderProps) {
  return (
    <Container>
      <Row>
        <Row>
          <h3>{props.title}</h3>
          <Col>
            <TriageButtonsGroup />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{props.readingMins + ' mins'}</p>
          </Col>
          <Col>
            <p>{props.author}</p>
          </Col>
          <Col>
            <p>{props.publication}</p>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}
