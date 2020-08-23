import React from 'react'
import {Button, ButtonGroup, Row} from 'react-bootstrap'

export default function TriageButtonsGroup() {
  return (
    <Row>
      <ButtonGroup>
        <Button>Save</Button>
        <Button>Bookmark</Button>
        <Button>Queue</Button>
      </ButtonGroup>
    </Row>
  )
}
