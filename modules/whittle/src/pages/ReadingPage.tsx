import React from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import ReadingHeader from '../components/common/ReadingHeader'
import {getBoxes} from '../store/getters/boxes'
import {useArticles} from '../util/hooks'

function ReadingPage() {
  let dispatch = useDispatch()
  let boxes = useSelector(getBoxes)
  useArticles(dispatch, boxes)

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
