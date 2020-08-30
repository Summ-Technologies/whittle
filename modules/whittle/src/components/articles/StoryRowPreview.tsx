import React, {CSSProperties, ReactElement, useState} from 'react'
import Col from 'react-bootstrap/Col'
import {OverlayChildren} from 'react-bootstrap/esm/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Row from 'react-bootstrap/Row'
import Tooltip from 'react-bootstrap/Tooltip'
import {FaList, FaRegBookmark, FaRegCheckCircle} from 'react-icons/fa'
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
  let [done, setDone] = useState(false)
  let [queued, setQueued] = useState(false)
  let [bookmarked, setBookmarked] = useState(false)

  function simpleTooltip(val: string): OverlayChildren {
    return <Tooltip id="button-tooltip">{val}</Tooltip>
  }

  function simpleOverlay(val: string) {
    return (children: ReactElement) => (
      <OverlayTrigger
        placement="top"
        delay={{show: 150, hide: 150}}
        overlay={simpleTooltip(val)}>
        {children}
      </OverlayTrigger>
    )
  }
  return (
    <Row
      style={props.onSelect ? {cursor: 'pointer'} : undefined}
      onClick={() => {
        if (props.onSelect) props.onSelect()
      }}>
      <StoryHighLevel
        showTags={false}
        title={props.title}
        source={props.source}
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
              onClick={(event) => {
                event.stopPropagation()
                props.onArchive()
              }}
              onMouseOver={() => setDone(true)}
              onMouseOut={() => setDone(false)}>
              {simpleOverlay('Mark as Done')(<FaRegCheckCircle size={20} />)}
            </div>
            <div
              style={{
                ...styles.triageButton,
                ...(bookmarked ? styles.triageButtonSelected : {}),
              }}
              onClick={(event) => {
                event.stopPropagation()
                props.onBookmark()
              }}
              onMouseOver={() => setBookmarked(true)}
              onMouseOut={() => setBookmarked(false)}>
              {simpleOverlay('Bookmark')(<FaRegBookmark size={20} />)}
            </div>
            <div
              style={{
                ...styles.triageButton,
                ...(queued ? styles.triageButtonSelected : {}),
              }}
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
    justifyContent: 'center',
  },
}
