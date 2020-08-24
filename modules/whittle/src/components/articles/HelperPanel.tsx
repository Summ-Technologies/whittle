import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {WhittleArticle} from '../../models/whittle'
import ArticleUtils from '../../util/article'
import StoryHighLevel from './StoryHighLevel'

type HelperPanelProps = {
  article: WhittleArticle | undefined
}

export default function HelperPanel(props: HelperPanelProps) {
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
          topics={props.article && props.article.tags ? props.article.tags : []}
          readingTime={
            props.article && props.article.content
              ? ArticleUtils.calculateReadingTime(props.article.content)
              : 0
          }
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
