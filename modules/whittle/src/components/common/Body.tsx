import React from 'react'
import Col from 'react-bootstrap/Col'

export default function Body(props: React.PropsWithChildren<{}>) {
  return (
    <Col
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '0 0 0 5%',
      }}
      className="mx-auto">
      {props.children}
    </Col>
  )
}
