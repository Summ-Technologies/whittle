import React, {CSSProperties} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import StoryHighLevel from './StoryHighLevel'

type StoryRowPreviewProps = {
  title: string
  source: string
  tags: string[]
  readingTime: number
  showTriage: boolean
  onSelect?: () => void
  onBookmark: () => void
  onQueue: () => void
  onArchive: () => void
}

export default function StoryRowPreview(props: StoryRowPreviewProps) {
  return (
    <Row
      style={props.onSelect ? {cursor: 'pointer'} : undefined}
      onClick={() => {
        if (props.onSelect) props.onSelect()
      }}>
      <StoryHighLevel
        title={props.title}
        source={props.source}
        topics={props.tags}
        readingTime={props.readingTime}
      />
      <Col xs={4} style={styles.triageSection}>
        {props.showTriage ? (
          <Row style={styles.buttonContainer}>
            <div
              style={styles.triageButton}
              onClick={(event) => {
                event.stopPropagation()
                props.onArchive()
              }}>
              Done
            </div>
            <div
              style={styles.triageButton}
              onClick={(event) => {
                event.stopPropagation()
                props.onBookmark()
              }}>
              Bookmark
            </div>
            <div
              style={styles.triageButton}
              onClick={(event) => {
                event.stopPropagation()
                props.onQueue()
              }}>
              Queue
            </div>
          </Row>
        ) : undefined}
      </Col>
    </Row>
  )
}

const styles: {[key: string]: CSSProperties} = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    justifyItems: 'center',
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
    borderColor: '#7F8791',
    color: '#7F8791',
  },
  triageSection: {
    display: 'flex',
    alignItems: 'center',
  },
}
