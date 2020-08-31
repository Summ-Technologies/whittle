import React from 'react'
import Col from 'react-bootstrap/Col'

export default function Body(props: React.PropsWithChildren<{}>) {
  return (
    <div style={{height: '100vh'}}>
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
    </div>
  )
}
