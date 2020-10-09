import React, {CSSProperties, useState} from 'react'
import Col from 'react-bootstrap/Col'
import {FaList, FaRegCheckCircle} from 'react-icons/fa'
import {simpleOverlay} from '../../util'
import Row from '../common/Row'
import StoryHighLevel from './StoryHighLevel'

type StoryRowPreviewProps = {
  title: string
  source: string // from address
  author: string // from name
  tags: string[]
  readingTime: number
  showTriage: boolean
  bookmarked: boolean
  onSelect?: () => void
  onToggleBookmark: (doBookmark: boolean) => void
  onQueue: () => void
  onArchive: () => void
}

export default function StoryRowPreview(props: StoryRowPreviewProps) {
  let [done, setDone] = useState(false)
  let [queued, setQueued] = useState(false)

  return (
    <Row
      style={props.onSelect ? {cursor: 'pointer'} : undefined}
      onClick={() => {
        if (props.onSelect) props.onSelect()
      }}>
      <StoryHighLevel
        title={props.title}
        source={props.author.length ? props.author : props.source}
        topics={props.tags}
        readingTime={props.readingTime}
      />
      <Col xs={4} style={styles.triageSection}>
        {props.showTriage ? (
          <Row style={styles.buttonContainer}>
            <div
              style={{
                ...styles.triageButton,
                ...(done ? styles.triageButtonSelected : {}),
              }}
              className="joyride-library"
              onClick={(event) => {
                event.stopPropagation()
                props.onArchive()
              }}
              onMouseOver={() => setDone(true)}
              onMouseOut={() => setDone(false)}>
              {simpleOverlay('Move to library')(<FaRegCheckCircle size={20} />)}
            </div>
            <div
              style={{
                ...styles.triageButton,
                ...(queued ? styles.triageButtonSelected : {}),
              }}
              className="joyride-queue"
              onClick={(event) => {
                event.stopPropagation()
                props.onQueue()
              }}
              onMouseOver={() => setQueued(true)}
              onMouseOut={() => setQueued(false)}>
              {simpleOverlay('Move to Queue')(<FaList size={20} />)}
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
    color: '#c4c4c4',
    fontSize: 25,
  },
  triageButtonSelected: {
    color: '#9f9f9f',
  },
  triageSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}
