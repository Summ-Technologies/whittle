import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {WhittleArticle} from '../../models/whittle'

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
      <Row>
        <div>
          {props.article && props.article.title ? props.article.title : ''}
        </div>
      </Row>
      <Row>
        <Col>
          <div>{readingTime + ' mins'}</div>
        </Col>
        <Col>
          <div>
            {props.article && props.article.source ? props.article.source : ''}
          </div>
        </Col>
      </Row>
      <Row>
        <div>Outline</div>
      </Row>
      <Row>
        {props.article && props.article.content ? props.article.content : ''}
      </Row>
    </Col>
  )
}
