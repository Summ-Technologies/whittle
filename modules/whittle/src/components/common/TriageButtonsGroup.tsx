import React from 'react'
import {Button, ButtonGroup, Row} from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

export default function TriageButtonsGroup() {
  return (
    <Container>
      <Row>
        <ButtonGroup>
          <Button>Save</Button>
          <Button>Bookmark</Button>
          <Button>Queue</Button>
        </ButtonGroup>
      </Row>
    </Container>
  )
}
