import React, {CSSProperties} from 'react'
import {Col} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import {WhittleArticle} from '../../models/whittle'
import defaultStyles from '../../styles'
import ArticleUtils from '../../util/article'
import Link from '../common/Link'
import Row from '../common/Row'
import StoryHighLevel from './StoryHighLevel'

type HelperPanelProps = {
  article?: WhittleArticle
  redirectOutline: (articleId: number, uri: string) => void
}

export default function HelperPanel(props: HelperPanelProps) {
  let redirectOutline = props.redirectOutline
  let article = props.article

  function MarkdownLinkRenderer(
    props: React.PropsWithChildren<{href: string}>
  ) {
    return (
      <Link
        color="unset"
        onClick={() => {
          if (article) redirectOutline(article.id, props.href)
        }}>
        {props.children}
      </Link>
    )
  }

  let styles: {[key: string]: CSSProperties} = {
    container: {
      backgroundColor: defaultStyles.colors.lightBlue,
      paddingLeft: 24,
      paddingRight: 24,
      minHeight: '100%',
      paddingTop: 16,
      borderLeftColor: defaultStyles.colors.lightGrey,
      borderLeftStyle: 'solid',
      borderLeftWidth: defaultStyles.defaultBorderWidth,
    },
    header2: {
      paddingBottom: 5,
    },
  }
  let source = props.article && props.article.author ? props.article.author : ''
  if (!source.length) {
    source = props.article && props.article.source ? props.article.source : ''
  }
  return (
    <Col style={styles.container}>
      {props.article ? (
        <>
          <Row>
            <StoryHighLevel
              source={source}
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
              <hr />
              <div className="joyride-preview-outline">
                <div style={{...defaultStyles.header2, ...styles.header2}}>
                  Outline
                </div>
                <div>
                  {props.article && props.article.outline ? (
                    <ReactMarkdown
                      source={props.article.outline}
                      renderers={{
                        root: MarkdownRoot,
                        link: MarkdownLinkRenderer,
                      }}
                    />
                  ) : (
                    ''
                  )}
                </div>
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
const MarkdownRoot = (props: any) => {
  return (
    <div style={{fontFamily: 'Inter'}} className={'markdownContainer'}>
      {props.children}
    </div>
  )
}
