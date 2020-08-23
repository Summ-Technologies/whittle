import React from 'react'
import {Button, Col, Form, FormControl, Row} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'

function LibraryPage() {
  return (
    <Body>
      <Row style={{width: '100%', height: '100%'}}>
        <Col style={{width: '90%'}}>
          {/* <Header /> */}
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
            <Button type="submit">Submit</Button>
            <Form.Control as="select">
              <option>All</option>
              <option>Bookmarked</option>
              <option>Done</option>
            </Form.Control>
          </Form>
          {/* <StoriesList onMouseOver={() => {}} storiesList={[]} /> */}
        </Col>
        <Col style={{width: '20%', height: '100%'}}>
          {/* <HelperPanel
            title={'Disrupting Disruption: Alex Danco'}
            readingMins={6}
            publication={'Divinations'}
            author={'Nathan Baschez'}
          /> */}
        </Col>
      </Row>
    </Body>
  )
}

export default withRouter(LibraryPage)
