import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import {useDispatch, useSelector} from 'react-redux'
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom'
import ReadingNavigationButtons from '../components/articles/ReaderNavigationButtons'
import StoryBody from '../components/articles/StoryBody'
import StoryRowPreview from '../components/articles/StoryRowPreview'
import Body from '../components/common/Body'
import Header, {HeaderTabs} from '../components/common/Header'
import {WhittleArticle} from '../models/whittle'
import {AppRoutes} from '../stacks'
import {triageArticle} from '../store/actions/boxes'
import {getArticle} from '../store/getters/articles'
import {getBoxes, getInbox, getLibrary, getQueue} from '../store/getters/boxes'
import ArticleUtils from '../util/article'
import {useArticles} from '../util/hooks'

type ReadingPageProps = RouteComponentProps<{id: string}>

function ReadingPage(props: ReadingPageProps) {
  let dispatch = useDispatch()
  let boxes = useSelector(getBoxes)
  let inbox = useSelector(getInbox)
  let queue = useSelector(getQueue)
  let library = useSelector(getLibrary)
  let article = useSelector(getArticle(parseInt(props.match.params.id)))
  let history = useHistory()
  let [nextArticle, setNextArticle] = useState<number | undefined>(undefined)
  let [previousArticle, setPreviousArticle] = useState<number | undefined>(
    undefined
  )

  useArticles(dispatch, boxes)

  useEffect(() => {
    if (article && article.id !== undefined) {
      Object.keys(boxes).forEach((key) => {
        let box = boxes[parseInt(key)]
        if (box.articles && box.articles.includes(article.id)) {
          let articleIndex = box.articles.indexOf(article.id)
          let lenBox = box.articles.length
          if (articleIndex > 0) {
            let prevArticle = box.articles[articleIndex - 1]
            setPreviousArticle(prevArticle)
          } else {
            setPreviousArticle(undefined)
          }
          if (articleIndex < lenBox - 1) {
            let nextArticle = box.articles[articleIndex + 1]
            setNextArticle(nextArticle)
          } else {
            setNextArticle(undefined)
          }
        }
      })
    }
  }, [
    article,
    nextArticle,
    setNextArticle,
    previousArticle,
    setPreviousArticle,
    boxes,
  ])

  /** Dispatch article to archive box */
  function archiveArticle(article: WhittleArticle) {
    if (library && article) {
      dispatch(triageArticle(article.id, library.id))
    }
  }

  /** Dispatch article to library box */
  function queueArticle(article: WhittleArticle) {
    if (queue && article) {
      dispatch(triageArticle(article.id, queue.id))
    }
  }

  /** Redirects to page for article with given id */
  function navigateToArticle(id: number) {
    history.push(AppRoutes.getPath('Read', {id: id.toString()}))
  }

  return (
    <Body>
      <Header
        inbox={inbox}
        queue={queue}
        library={library}
        activeTab={undefined}
        onSelectTab={(tab: HeaderTabs) =>
          history.push(AppRoutes.getPath('Home', {box: tab}))
        }
      />
      <Row style={{paddingTop: 16}}>
        <Col md={{span: '1'}}>
          <ReadingNavigationButtons
            onPressDown={
              nextArticle !== undefined
                ? () => navigateToArticle(nextArticle as number)
                : undefined
            }
            onPressUp={
              previousArticle !== undefined
                ? () => navigateToArticle(previousArticle as number)
                : undefined
            }
          />
        </Col>
        {article ? (
          <Col md={{span: '10'}}>
            <StoryRowPreview
              title={article.title}
              source={article.source}
              tags={article.tags}
              readingTime={
                article && article.html_content
                  ? ArticleUtils.calculateReadingTime(article.html_content)
                  : 0
              }
              showTriage={true}
              onQueue={() => queueArticle(article)}
              onBookmark={() => archiveArticle(article)}
              onArchive={() => archiveArticle(article)}
            />
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
                  {article && article.content ? (
                    <ReactMarkdown source={article.content} />
                  ) : (
                    ''
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        ) : undefined}
      </Row>
      <Row>
        {article ? (
          <Col md={{span: '10', offset: '1'}}>
            <Row noGutters style={{justifyContent: 'center', paddingTop: 24}}>
              <StoryBody html={article.html_content} />
            </Row>
          </Col>
        ) : undefined}
      </Row>
    </Body>
  )
}

export default withRouter(ReadingPage)
