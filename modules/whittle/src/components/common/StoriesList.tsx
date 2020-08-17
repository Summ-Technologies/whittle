import React from 'react'
import {Col, Row} from 'react-bootstrap'
import Table from 'react-bootstrap/Table'

type StoriesListProps = {
  storiesList: String[]
}

export default function StoriesList(props: StoriesListProps) {
  const tableRows = props.storiesList.map((story) => {
    return (
      <tr>
        <td>
          <Row>
            <h5>{story}</h5>
          </Row>
          <Row>
            <Col>
              <p>{'6 mins'}</p>
            </Col>
            <Col>
              <p>{'Nathan Baschez'}</p>
            </Col>
            <Col>
              <p>{'Divinations'}</p>
            </Col>
          </Row>
        </td>
      </tr>
    )
  })

  return (
    <Table responsive bordered size="sm">
      <tbody>{tableRows}</tbody>
    </Table>
  )
}
