import React, {useEffect, useState} from 'react'
import Row from 'react-bootstrap/Row'
import {useDispatch, useSelector} from 'react-redux'
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom'
import StoriesList from '../components/articles/StoriesList'
import {HeaderTabs} from '../components/common/Header'
import OutlineHeaderBody from '../components/common/OutlineHeaderBody'
import {WhittleArticle, WhittleBox} from '../models/whittle'
import {AppRoutes} from '../stacks'
import {toggleBookmark} from '../store/actions/articles'
import {triageArticle} from '../store/actions/boxes'
import {getArticles} from '../store/getters/articles'
import {getBoxes, getInbox, getLibrary, getQueue} from '../store/getters/boxes'
import {useArticles} from '../util/hooks'

type HomePageProps = RouteComponentProps<{box: string}>

function HomePage(props: HomePageProps) {
  let dispatch = useDispatch()
  let history = useHistory()
  let boxes = useSelector(getBoxes)
  let articles = useSelector(getArticles)
  let inbox = useSelector(getInbox)
  let queue = useSelector(getQueue)
  let library = useSelector(getLibrary)

  let activeTab = (HeaderTabs as ReadonlyArray<string>).includes(
    props.match.params.box.toLowerCase()
  )
    ? (props.match.params.box as HeaderTabs)
    : 'inbox'

  let [activeBox, setActiveBox] = useState<WhittleBox | undefined>(undefined)
  let [previewedArticle, setPreviewedArticle] = useState<
    WhittleArticle | undefined
  >(undefined)

  useArticles(dispatch, boxes)

  useEffect(() => {
    if (
      activeBox &&
      activeBox.articles &&
      activeBox.articles.length &&
      (previewedArticle === undefined ||
        !activeBox.articles.includes(previewedArticle.id))
    ) {
      let activeArticleId = activeBox.articles[0]
      let activeArticle = articles[activeArticleId]
      setPreviewedArticle(activeArticle)
    } else if (
      !activeBox ||
      !activeBox.articles ||
      !activeBox.articles.length
    ) {
      setPreviewedArticle(undefined)
    }
  }, [previewedArticle, setPreviewedArticle, activeBox, articles])

  useEffect(() => {
    switch (activeTab) {
      case 'inbox':
        setActiveBox(inbox)
        break
      case 'queue':
        setActiveBox(queue)
        break
      case 'library':
        setActiveBox(library)
        break
    }
  }, [activeTab, activeBox, setActiveBox, inbox, queue, library])

  /** Dispatch article to library box */
  function archiveArticle(article: WhittleArticle) {
    if (library && article) {
      dispatch(triageArticle(article.id, library.id))
    }
  }

  /** Dispatch action bookmarking article */
  function doToggleBookmark(article: WhittleArticle, doBookmark: boolean) {
    if (library && article) {
      dispatch(toggleBookmark(article.id, doBookmark))
    }
  }

  /** Dispatch article to library box */
  function queueArticle(article: WhittleArticle) {
    if (queue && article) {
      dispatch(triageArticle(article.id, queue.id))
    }
  }

  return (
    <OutlineHeaderBody
      inboxCount={inbox && inbox.articles ? inbox.articles.length : 0}
      queueCount={queue && queue.articles ? queue.articles.length : 0}
      libraryCount={library && library.articles ? library.articles.length : 0}
      article={previewedArticle}
      activeTab={activeTab}
      onSelectTab={(tab: HeaderTabs) =>
        history.push(AppRoutes.getPath('Box', {box: tab}))
      }
      onClickHome={() =>
        history.push(AppRoutes.getPath('Box', {box: 'inbox'}))
      }>
      <StoriesList
        onHoverArticle={(article: WhittleArticle) =>
          setPreviewedArticle(article)
        }
        onSelectArticle={(article: WhittleArticle) =>
          history.push(AppRoutes.getPath('Read', {id: article.id.toString()}))
        }
        onBookmarkArticle={doToggleBookmark}
        onQueueArticle={queueArticle}
        onArchiveArticle={archiveArticle}
        storiesList={
          activeBox && activeBox.articles
            ? activeBox.articles.map((id) => articles[id]).filter((val) => val)
            : []
        }
        activeStory={previewedArticle}
      />
      {activeTab === 'inbox' ? (
        <Row>
          <div
            className="clickable"
            style={{
              display: 'flex',
              flexDirection: 'row',
              color: '#9f9f9f',
              marginLeft: 15,
            }}>
            <div style={{fontWeight: 'bold'}}>{'175'}</div>
            <div style={{paddingLeft: 7, color: '#9f9f9f'}}>
              {'older (7+ days)'}
            </div>
          </div>
          <div
            className="clickable"
            style={{
              color: '#9f9f9f',
              marginLeft: 24,
            }}>
            Move all to library?
          </div>
        </Row>
      ) : undefined}
    </OutlineHeaderBody>
  )
}

export default withRouter(HomePage)
