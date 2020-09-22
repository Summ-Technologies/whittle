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
import {toggleBookmark} from '../store/actions/articles'
import {triageArticle} from '../store/actions/boxes'
import {deleteUserLogin} from '../store/actions/user'
import {getArticle} from '../store/getters/articles'
import {getBoxes, getInbox, getLibrary, getQueue} from '../store/getters/boxes'
import {getUser} from '../store/getters/user'
import ArticleUtils from '../util/article'
import {useHome} from '../util/hooks'

type ReadingPageProps = RouteComponentProps<{id: string}>

function ReadingPage(props: ReadingPageProps) {
  let dispatch = useDispatch()
  let boxes = useSelector(getBoxes)
  let inbox = useSelector(getInbox)
  let queue = useSelector(getQueue)
  let library = useSelector(getLibrary)
  let article = useSelector(getArticle(parseInt(props.match.params.id)))
  let user = useSelector(getUser)
  let history = useHistory()
  let [nextArticle, setNextArticle] = useState<number | undefined>(undefined)
  let [previousArticle, setPreviousArticle] = useState<number | undefined>(
    undefined
  )
  let [currentBox, setCurrentBox] = useState<WhittleBox | undefined>(undefined)
  let [currentBoxTab, setCurrentBoxTab] = useState<HeaderTabs | undefined>(
    undefined
  )

  useHome(dispatch)

  useEffect(() => {
    if (article && article.id !== undefined) {
      Object.keys(boxes).forEach((key) => {
        let box = boxes[parseInt(key)]
        if (box.articles && box.articles.includes(article.id)) {
          switch (box.name.toLowerCase()) {
            case 'inbox':
              setCurrentBoxTab('inbox')
              break
            case 'queue':
              setCurrentBoxTab('queue')
              break
            case 'library':
              setCurrentBoxTab('library')
              break
          }
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
    setCurrentBoxTab,
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

  /** Dispatch action bookmarking article */
  function doToggleBookmark(article: WhittleArticle, doBookmark: boolean) {
    if (article) {
      dispatch(toggleBookmark(article.id, doBookmark))
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

  /** Redirects outline link to page with anchor */
  function redirectOutline(articleId: number, uri: string) {
    if (uri.startsWith('#')) {
      history.push(
        `${AppRoutes.getPath('Read', {id: articleId.toString()})}${uri}`
      )
    } else {
      history.push(uri)
    }
  }

  return (
    <OutlineHeaderBody
      article={article}
      user={user}
      inboxCount={inbox && inbox.articles ? inbox.articles.length : 0}
      queueCount={queue && queue.articles ? queue.articles.length : 0}
      libraryCount={library && library.articles ? library.articles.length : 0}
      activeTab={currentBoxTab}
      onSelectTab={(tab: HeaderTabs) =>
        history.push(AppRoutes.getPath('Box', {box: tab}))
      }
      onLogoutUser={() => dispatch(deleteUserLogin())}
      redirectOutline={redirectOutline}>
      <Col
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Row
          style={{
            paddingTop: 16,
            paddingBottom: 16,
          }}>
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
            <Col xs={{span: '11'}}>
              <StoryRowPreview
                title={article.title}
                source={article.source}
                tags={article.tags}
                readingTime={
                  article && article.html_content
                    ? ArticleUtils.calculateReadingTime(article.html_content)
                    : 0
                }
                bookmarked={article.bookmarked}
                showTriage={true}
                onQueue={() => queueArticle(article)}
                onToggleBookmark={(doBookmark: boolean) =>
                  doToggleBookmark(article, doBookmark)
                }
                onArchive={() => archiveArticle(article)}
              />
            </Col>
          ) : undefined}
        </Row>
        <Row style={{minHeight: 0, flex: 1, overflowY: 'scroll'}}>
          {article ? (
            <Col xs={{span: 11, offset: 1}}>
              <StoryBody html={article.html_content} />
            </Col>
          ) : undefined}
        </Row>
      </Col>
    </OutlineHeaderBody>
  )
}

export default withRouter(ReadingPage)
