import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from './Row'

export default function Body(props: React.PropsWithChildren<{}>) {
  return (
    <div style={{height: '100vh'}}>
      <Row
        style={{
          height: '100%',
        }}>
        <Col
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowY: 'scroll',
          }}
          className="mx-auto">
          {props.children}
        </Col>
      </Row>
    </div>
  )
}
