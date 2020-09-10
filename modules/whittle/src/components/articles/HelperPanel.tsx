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

const MyRoot = (props: any) => {
  return (
    <div style={{fontFamily: 'Inter'}} className={'markdownContainer'}>
      {props.children}
    </div>
  )
}

export default function HelperPanel(props: HelperPanelProps) {
  return (
    <Col
      style={{
        backgroundColor: '#F2F5F7',
        paddingLeft: 24,
        paddingRight: 24,
        minHeight: '100%',
      }}>
      {props.article ? (
        <>
          <Row style={{paddingTop: 16}}>
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
            <Col className="joyride-preview-outline">
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
                  fontWeight: 600,
                  color: '#BFC2C3',
                  paddingBottom: 8,
                }}>
                Outline
              </div>
              <div>
                {props.article && props.article.outline ? (
                  <ReactMarkdown
                    source={props.article.outline}
                    renderers={{root: MyRoot}}
                  />
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
                  fontWeight: 600,
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
