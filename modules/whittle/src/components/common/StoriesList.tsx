import React from 'react'
import {Col, Row} from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import {WhittleArticle} from '../../models/whittle'

type StoriesListProps = {
  storiesList: WhittleArticle[]
  onMouseOver: () => void
}

export default function StoriesList(props: StoriesListProps) {
  const tableRows = props.storiesList.map((story) => {
    return (
      <tr>
        <td>
          <Row>
            <h5>{story.title}</h5>
          </Row>
          <Row>
            <Col>
              <p>{story.source}</p>
            </Col>
          </Row>
        </td>
      </tr>
    )
  })

  return (
    <Table responsive bordered hover size="md" onMouseOver={props.onMouseOver}>
      <tbody>{tableRows}</tbody>
    </Table>
  )
}
