import React, {CSSProperties} from 'react'
import {Col} from 'react-bootstrap'
import {FaCircle, FaPlus} from 'react-icons/fa'
import Row from '../common/Row'
import TopicTag from './TopicTag'

type StoryHighLevelProps = {
  title: String
  topics: string[]
  source: String
  author?: string
  readingTime: number
  showTags: boolean
}

const styles: {[key: string]: CSSProperties} = {
  readingTime: {
    paddingRight: 6,
    color: '#AAABB7',
    fontFamily: 'Inter',
  },
  source: {
    paddingRight: 6,
    paddingLeft: 6,
    color: '#AAABB7',
    fontFamily: 'Inter',
  },
  title: {fontSize: 18, fontWeight: 500, fontFamily: 'Inter'},
}

export default function StoryHighLevel(props: StoryHighLevelProps) {
  return (
    <Col>
      <Row>
        <div style={styles.title}>{props.title}</div>
      </Row>
      <Row style={{paddingTop: 5, alignItems: 'center'}}>
        <div style={styles.readingTime}>{`${props.readingTime} mins`}</div>
        <FaCircle color={'#AAABB7'} size={5} />
        <div style={styles.source}>{props.source}</div>
        {props.author ? (
          <div style={styles.readingTime}>{props.author}</div>
        ) : undefined}
      </Row>
      {props.showTags ? (
        <Row style={{paddingTop: 10}}>
          {props.topics.map((topic) => {
            return <TopicTag name={topic} />
          })}
          <div style={{width: 6}}></div>
          <Row className="clickable" style={{alignItems: 'center'}}>
            <FaPlus size={10} color="#BFC2C3" />
            <div
              style={{
                color: '#BFC2C3',
                paddingLeft: 6,
                cursor: 'pointer',
                fontFamily: 'Inter',
              }}>
              Add tags
            </div>
          </Row>
        </Row>
      ) : undefined}
    </Col>
  )
}
