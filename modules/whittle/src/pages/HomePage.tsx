import React, {CSSProperties, useEffect, useState} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import Header, {HeaderTabs} from '../components/common/Header'
import HelperPanel from '../components/common/HelperPanel'
import StoriesList from '../components/common/StoriesList'
import {getBoxArticles, getUserBoxes} from '../store/actions/boxes'
import {getArticles} from '../store/getters/articles'
import {getBoxes, getInbox, getLibrary, getQueue} from '../store/getters/boxes'

const styles: {[key: string]: CSSProperties} = {
  rightPanelContainer: {height: '100%'},
  leftPanelContainer: {height: '100%', overflowX: 'scroll'},
}

function HomePage() {
  let dispatch = useDispatch()
  let boxes = useSelector(getBoxes)
  let articles = useSelector(getArticles)
  let inbox = useSelector(getInbox)
  let queue = useSelector(getQueue)
  let library = useSelector(getLibrary)

  let [activeTab, setActiveTab] = useState<HeaderTabs>('inbox')

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
          <Header
            inbox={inbox}
            queue={queue}
            library={library}
            activeTab={activeTab}
            onSelectTab={(tab: HeaderTabs) => setActiveTab(tab)}
          />
        </Col>
      </Row>
      <Row style={{flexGrow: 1}}>
        <Col xs={6} style={styles.rightPanelContainer}>
          <StoriesList
            onMouseOver={() => console.log('mouseOver')}
            storiesList={
              inbox && inbox.articles
                ? inbox.articles.map((id) => articles[id]).filter((val) => val)
                : []
            }
          />
        </Col>
        <Col xs={6} style={styles.rightPanelContainer}>
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
