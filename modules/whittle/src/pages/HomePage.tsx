import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import Header from '../components/common/Header'
import HelperPanel from '../components/common/HelperPanel'
import StoriesList from '../components/common/StoriesList'

function HomePage() {
  return (
    <Body>
      <Row style={{width: '100%', height: '100%'}}>
        <Col style={{width: '90%'}}>
          <Header />
          <StoriesList
            storiesList={[
              'Disrupting Disruption: Alex Danco',
              'Disrupting Disrupation: Ben Thompson',
              'Another newsletter title',
              'Another one',
            ]}
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
