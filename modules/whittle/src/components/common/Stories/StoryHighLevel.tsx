import React, {CSSProperties} from 'react'
import {Col, Row} from 'react-bootstrap'
import TopicTag from './TopicTag'

type StoryHighLevelProps = {
  title: String
  topics: String[]
  source: String
}

const styles: {[key: string]: CSSProperties} = {
  readingTime: {
    paddingRight: 6,
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
  },
  title: {fontSize: 18, fontWeight: 'bold'},
}

export default function StoryHighLevel(props: StoryHighLevelProps) {
  return (
    <Col>
      <Row>
        <div style={styles.title}>{props.title}</div>
      </Row>
      <Row style={{paddingTop: 5}}>
        <div style={styles.readingTime}>{'0 mins'}</div>
        <div style={styles.readingTime}>{props.source}</div>
        <div style={styles.readingTime}>{'AUTHOR'}</div>
      </Row>
      <Row style={{paddingTop: 10}}>
        {props.topics.map((topic) => {
          return <TopicTag name={topic} />
        })}
      </Row>
    </Col>
  )
}
