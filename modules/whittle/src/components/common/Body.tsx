import React from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default function Body(props: React.PropsWithChildren<{}>) {
  return (
    <Container>
      <Col className="mx-auto">{props.children}</Col>
    </Container>
  )
}
