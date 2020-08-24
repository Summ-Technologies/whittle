import React, {CSSProperties, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import {WhittleArticle} from '../../../models/whittle'
import StoryHighLevel from '../Stories/StoryHighLevel'

type StoriesListProps = {
  storiesList: WhittleArticle[]
  onHoverArticle: (article: WhittleArticle) => void
  onBookmarkArticle: (article: WhittleArticle) => void
  onQueueArticle: (article: WhittleArticle) => void
  onArchiveArticle: (article: WhittleArticle) => void
}

export default function StoriesList(props: StoriesListProps) {
  const styles: {[key: string]: CSSProperties} = {
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: 15,
    },
    triageButton: {
      cursor: 'pointer',
      margin: 5,
      paddingLeft: 5,
      paddingRight: 5,
      borderWidth: 1,
      borderRadius: 3,
      borderStyle: 'solid',
      borderColor: '#000000',
    },
  }

  let [activeStory, setActiveStory] = useState<WhittleArticle | undefined>(
    undefined
  )

  const tableRows = props.storiesList.map((story, index) => {
    return (
      <tr
        onMouseOver={(
          event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
        ) => {
          props.onHoverArticle(story)
          setActiveStory(story)
        }}
        key={index}>
        <td style={{borderBottom: '1px solid #dee2e6', borderTop: '0px solid'}}>
          <Row noGutters style={{padding: '0 2%', alignItems: 'center'}}>
            <StoryHighLevel
              title={story.title}
              source={story.source}
              topics={['Startups', 'test topic']}
            />
            <Col xs={4}>
              {activeStory === story ? (
                <Row style={styles.buttonContainer}>
                  <div
                    style={styles.triageButton}
                    onClick={() => props.onArchiveArticle(story)}>
                    Done
                  </div>
                  <div
                    style={styles.triageButton}
                    onClick={() => props.onBookmarkArticle(story)}>
                    Bookmark
                  </div>
                  <div
                    style={styles.triageButton}
                    onClick={() => props.onQueueArticle(story)}>
                    Queue
                  </div>
                </Row>
              ) : undefined}
            </Col>
          </Row>
        </td>
      </tr>
    )
  })

  return (
    <Table responsive hover size="md">
      <tbody>{tableRows}</tbody>
    </Table>
  )
}
