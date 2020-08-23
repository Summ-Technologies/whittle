import React from 'react'
import {Col, Row} from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import {WhittleArticle} from '../../models/whittle'

type StoriesListProps = {
  storiesList: WhittleArticle[]
  onHoverArticle: (article: WhittleArticle) => void
  onBookmarkArticle: (article: WhittleArticle) => void
  onQueueArticle: (article: WhittleArticle) => void
  onArchiveArticle: (article: WhittleArticle) => void
}

export default function StoriesList(props: StoriesListProps) {
  const tableRows = props.storiesList.map((story, index) => {
    return (
      <tr
        onMouseOver={(
          event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
        ) => props.onHoverArticle(story)}
        key={index}>
        <td>
          <Row style={{padding: '0 2%', alignItems: 'center'}}>
            <Col xs={6}>
              <Row>
                <h5>{story.title}</h5>
              </Row>
              <Row>
                <p>{story.source}</p>
              </Row>
            </Col>
            <Col xs={6}>
              <Row>
                <div onClick={() => props.onArchiveArticle(story)}>Done</div>
                <div onClick={() => props.onBookmarkArticle(story)}>
                  Bookmark
                </div>
                <div onClick={() => props.onQueueArticle(story)}>Queue</div>
              </Row>
            </Col>
          </Row>
        </td>
      </tr>
    )
  })

  return (
    <Table responsive bordered hover size="md">
      <tbody>{tableRows}</tbody>
    </Table>
  )
}
