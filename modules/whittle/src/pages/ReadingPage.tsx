import React from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import ReadingHeader from '../components/common/ReadingHeader'

//var email = require('../util/testemail.html')

function ReadingPage() {
  return (
    <Body>
      <Row>
        <Col>
          <Row>
            <Button>Back</Button>
          </Row>
          <Row>
            <Button>Previous</Button>
          </Row>
          <Row>
            <Button>Next</Button>
          </Row>
        </Col>
        <Col md={10}>
          <Row>
            <ReadingHeader
              title={'Disrupting Disruption: Alex Danco'}
              author={'Nathan Baschez'}
              publication={'Divinations'}
              readingMins={6}
            />
          </Row>
          <Row>{/* HTML goes here! */}</Row>
        </Col>
      </Row>
    </Body>
  )
}

export default withRouter(ReadingPage)
