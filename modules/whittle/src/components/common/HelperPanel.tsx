import React from 'react'
import {Col, Row} from 'react-bootstrap'

type HelperPanelProps = {
  title: String
  readingMins: number
  topics?: number[]
  author: String
  publication: String
  outline?: string[]
}

export default function HelperPanel(props: HelperPanelProps) {
  return (
    <Col
      style={{
        backgroundColor: '#EAEDFF',
        height: '100%',
      }}>
      <Row>
        <h5>{props.title}</h5>
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
      <Row>
        <h5>{'Outline'}</h5>
      </Row>
      <Row>{/* props.outline.forEach()  */}</Row>
    </Col>
  )
}
