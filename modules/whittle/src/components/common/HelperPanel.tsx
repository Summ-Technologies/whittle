import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {WhittleArticle} from '../../models/whittle'
import StoryHighLevel from './Stories/StoryHighLevel'

type HelperPanelProps = {
  article: WhittleArticle | undefined
}

export default function HelperPanel(props: HelperPanelProps) {
  let [readingTime, setReadingTime] = useState(0)
  useEffect(() => {
    function calculateReadingTime(content: string): number {
      let words = content.split(' ')
      return Math.round(words.length / 300)
    }
    const calculatedReadingTime =
      props.article && props.article.content
        ? calculateReadingTime(props.article.content)
        : 0
    setReadingTime(calculatedReadingTime)
  }, [setReadingTime, props.article])

  return (
    <Col
      style={{
        backgroundColor: '#EAEDFF',
        height: '100%',
      }}>
      <Row style={{paddingLeft: 16, paddingTop: 10}}>
        <StoryHighLevel
          source={
            props.article && props.article.source ? props.article.source : ''
          }
          title={
            props.article && props.article.title ? props.article.title : ''
          }
          topics={['Startups', 'test topic']}
        />
      </Row>
      <Row style={{paddingLeft: 16, paddingRight: 16}}>
        <div
          style={{
            paddingTop: 16,
            textDecoration: 'underline',
            fontWeight: 'bold',
          }}>
          Outline
        </div>
        {props.article && props.article.content ? props.article.content : ''}
      </Row>
    </Col>
  )
}
