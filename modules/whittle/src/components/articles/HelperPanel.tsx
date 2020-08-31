import React from 'react'
import {Col} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import {WhittleArticle} from '../../models/whittle'
import ArticleUtils from '../../util/article'
import Row from '../common/Row'
import StoryHighLevel from './StoryHighLevel'

type HelperPanelProps = {
  article?: WhittleArticle
}

export default function HelperPanel(props: HelperPanelProps) {
  return (
    <Col
      style={{
        backgroundColor: '#F2F5F7',
        minHeight: '100%',
      }}>
      {props.article ? (
        <>
          <Row>
            <StoryHighLevel
              showTags={true}
              source={
                props.article && props.article.source
                  ? props.article.source
                  : ''
              }
              title={
                props.article && props.article.title ? props.article.title : ''
              }
              topics={
                props.article && props.article.tags ? props.article.tags : []
              }
              readingTime={
                props.article && props.article.html_content
                  ? ArticleUtils.calculateReadingTime(
                      props.article.html_content
                    )
                  : 0
              }
            />
          </Row>
          <Row>
            <Col>
              <div
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: '#c4c4c4',
                  marginTop: 24,
                }}></div>
              <div
                style={{
                  paddingTop: 16,
                  fontWeight: 'bold',
                  color: '#BFC2C3',
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
              <div
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: '#c4c4c4',
                  marginTop: 24,
                }}></div>
              <div
                style={{
                  paddingTop: 16,
                  fontWeight: 'bold',
                  color: '#BFC2C3',
                }}>
                Your highlights
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}
    </Col>
  )
}
