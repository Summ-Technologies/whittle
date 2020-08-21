import React, {useEffect} from 'react'
import {Col, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import Header from '../components/common/Header'
import HelperPanel from '../components/common/HelperPanel'
import StoriesList from '../components/common/StoriesList'
import {getBoxArticles, getUserBoxes} from '../store/actions/boxes'
import {getBoxes} from '../store/getters/boxes'

function HomePage() {
  let dispatch = useDispatch()
  let boxes = useSelector(getBoxes)

  useEffect(() => {
    // Get all inboxes for user if not already loaded
    if (Object.keys(boxes).length === 0) {
      dispatch(getUserBoxes())
    } else {
      Object.keys(boxes).forEach((key) => {
        let box = boxes[parseInt(key)]
        if (!box.articles) {
          dispatch(getBoxArticles(box.id))
        }
      })
    }
  }, [dispatch, boxes])

  return (
    <Body>
      <Row>
        <Col>
          <Header />
          <StoriesList
            onMouseOver={() => console.log('mouseOver')}
            storiesList={[]}
          />
        </Col>
        <Col style={{width: '20%', height: '100%'}}>
          <HelperPanel
            title={'Disrupting Disruption: Alex Danco'}
            readingMins={6}
            publication={'Divinations'}
            author={'Nathan Baschez'}
          />
        </Col>
      </Row>
    </Body>
  )
}

export default withRouter(HomePage)
