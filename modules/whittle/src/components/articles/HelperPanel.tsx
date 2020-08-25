import React from 'react'
import {Col, Row} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
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
        backgroundColor: '#EFF0F5',
        height: '100%',
      }}>
      <Row style={{paddingTop: 10}}>
        <StoryHighLevel
          source={
            props.article && props.article.source ? props.article.source : ''
          }
          title={
            props.article && props.article.title ? props.article.title : ''
          }
          topics={props.article && props.article.tags ? props.article.tags : []}
          readingTime={
            props.article && props.article.html_content
              ? ArticleUtils.calculateReadingTime(props.article.html_content)
              : 0
          }
        />
      </Row>
      <Row noGutters>
        <Col>
          <div
            style={{
              paddingTop: 16,
              textDecoration: 'underline',
              fontWeight: 'bold',
            }}>
            Outline
          </div>
          <div>
            {props.article && props.article.content ? (
              <ReactMarkdown source={props.article.content} />
            ) : (
              ''
            )}
          </div>
        </Col>
      </Row>
    </Col>
  )
}
