import React, {CSSProperties} from 'react'
import {Col} from 'react-bootstrap'
import {FaCircle} from 'react-icons/fa'
import defaultStyles from '../../styles'
import Row from '../common/Row'

type StoryHighLevelProps = {
  title: String
  topics: string[]
  source: String
  author?: string
  readingTime: number
}

const styles: {[key: string]: CSSProperties} = {
  title: {fontSize: 18, fontWeight: 500},
  bodyContainer: {paddingTop: 5, alignItems: 'center'},
  bodyItem: {
    marginRight: 6,
    color: defaultStyles.colors.grey,
  },
}
export default function StoryHighLevel(props: StoryHighLevelProps) {
  return (
    <Col>
      <Row>
        <div style={styles.title}>{props.title}</div>
      </Row>
      <Row style={styles.bodyContainer}>
        <div style={styles.bodyItem}>{`${props.readingTime} mins`}</div>
        <FaCircle style={styles.bodyItem} size={5} />
        <div style={styles.bodyItem}>{props.source}</div>
        {props.author ? (
          <div style={styles.bodyItem}>{props.author}</div>
        ) : undefined}
      </Row>
    </Col>
  )
}
