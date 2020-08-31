import React, {useEffect, useState} from 'react'
import {Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom'
import ReadingNavigationButtons from '../components/articles/ReaderNavigationButtons'
import StoryBody from '../components/articles/StoryBody'
import StoryRowPreview from '../components/articles/StoryRowPreview'
import {HeaderTabs} from '../components/common/Header'
import OutlineHeaderBody from '../components/common/OutlineHeaderBody'
import Row from '../components/common/Row'
import {WhittleArticle, WhittleBox} from '../models/whittle'
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
  let [currentBox, setCurrentBox] = useState<WhittleBox | undefined>(undefined)

  useArticles(dispatch, boxes)

  useEffect(() => {
    if (article && article.id !== undefined) {
      Object.keys(boxes).forEach((key) => {
        let box = boxes[parseInt(key)]
        if (box.articles && box.articles.includes(article.id)) {
          setCurrentBox(box)
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

  function triage(articleId: number, boxId: number) {
    dispatch(triageArticle(articleId, boxId))
    if (nextArticle !== undefined) {
      history.push(AppRoutes.getPath('Read', {id: nextArticle.toString()}))
    } else {
      if (currentBox) {
        history.push(
          AppRoutes.getPath('Box', {box: currentBox.name.toLowerCase()})
        )
      } else {
        history.push(AppRoutes.getPath('Box', {box: 'inbox'}))
      }
    }
  }

  /** Dispatch article to archive box */
  function archiveArticle(article: WhittleArticle) {
    if (library && article) {
      triage(article.id, library.id)
    }
  }

  /** Dispatch article to library box */
  function queueArticle(article: WhittleArticle) {
    if (queue && article) {
      triage(article.id, queue.id)
    }
  }

  /** Redirects to page for article with given id */
  function navigateToArticle(id: number) {
    history.push(AppRoutes.getPath('Read', {id: id.toString()}))
  }

  return (
    <OutlineHeaderBody
      article={article}
      inboxCount={inbox && inbox.articles ? inbox.articles.length : 0}
      queueCount={queue && queue.articles ? queue.articles.length : 0}
      libraryCount={library && library.articles ? library.articles.length : 0}
      activeTab={undefined}
      onSelectTab={(tab: HeaderTabs) =>
        history.push(AppRoutes.getPath('Box', {box: tab}))
      }
      onClickHome={() =>
        history.push(AppRoutes.getPath('Box', {box: 'inbox'}))
      }>
      <Col xs={8} style={{overflowY: 'scroll'}}>
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
            <Col xs={{span: '10'}}>
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
            </Col>
          ) : undefined}
        </Row>
        <Row>
          {article ? (
            <Col xs={{span: 10, offset: 1}}>
              <StoryBody html={article.html_content} />
            </Col>
          ) : undefined}
        </Row>
      </Col>
    </OutlineHeaderBody>
  )
}

export default withRouter(ReadingPage)
