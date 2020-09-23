import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom'
import EmptyBox from '../components/articles/EmptyBox'
import StoriesList from '../components/articles/StoriesList'
import {HeaderTabs} from '../components/common/Header'
import OutlineHeaderBody from '../components/common/OutlineHeaderBody'
import {WhittleArticle, WhittleBox} from '../models/whittle'
import {AppRoutes} from '../stacks'
import {toggleBookmark} from '../store/actions/articles'
import {getBoxArticles, triageArticle} from '../store/actions/boxes'
import {deleteUserLogin} from '../store/actions/user'
import {getArticles} from '../store/getters/articles'
import {getInbox, getLibrary, getQueue} from '../store/getters/boxes'
import {getUser} from '../store/getters/user'
import {useHome} from '../util/hooks'
import {imageNames, ImageUtils} from '../util/image'

type BoxPageProps = RouteComponentProps<{box: string}>

function BoxPage(props: BoxPageProps) {
  let dispatch = useDispatch()
  let history = useHistory()
  let articles = useSelector(getArticles)
  let inbox = useSelector(getInbox)
  let queue = useSelector(getQueue)
  let library = useSelector(getLibrary)
  let user = useSelector(getUser)

  let activeTab = (HeaderTabs as ReadonlyArray<string>).includes(
    props.match.params.box.toLowerCase()
  )
    ? (props.match.params.box as HeaderTabs)
    : 'inbox'

  let [activeBox, setActiveBox] = useState<WhittleBox | undefined>(undefined)
  let [previewedArticle, setPreviewedArticle] = useState<
    WhittleArticle | undefined
  >(undefined)

  useHome(dispatch)

  useEffect(() => {
    if (
      activeBox &&
      activeBox.articles &&
      activeBox.numArticles &&
      (previewedArticle === undefined ||
        !activeBox.articles.includes(previewedArticle.id))
    ) {
      let activeArticleId = activeBox.articles[0]
      let activeArticle = articles[activeArticleId]
      setPreviewedArticle(activeArticle)
    } else if (!activeBox || !activeBox.articles || !activeBox.numArticles) {
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
  }, [activeTab, activeBox, setActiveBox, inbox, queue, library, dispatch])
  /** Gets next page */
  let getNextPageOfArticles = useCallback(
    (box: WhittleBox | undefined) => {
      if (activeBox) {
        let page = 0
        if (activeBox.page !== undefined) {
          page = activeBox.page + 1
        }
        if (activeBox.isFullyLoaded !== true) {
          dispatch(getBoxArticles(activeBox.id, page))
        }
      }
    },
    [activeBox, dispatch]
  )

  useEffect(() => {
    function getFirstPage(activeBox: WhittleBox | undefined) {
      if (activeBox && activeBox.page === undefined) {
        let page = 0
        dispatch(getBoxArticles(activeBox.id, page))
      }
    }
    getFirstPage(activeBox)
  }, [activeBox, dispatch])

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
      inboxCount={
        inbox && inbox.numArticles !== undefined ? inbox.numArticles : 0
      }
      queueCount={
        queue && queue.numArticles !== undefined ? queue.numArticles : 0
      }
      libraryCount={
        library && library.numArticles !== undefined ? library.numArticles : 0
      }
      article={previewedArticle}
      user={user}
      activeTab={activeTab}
      onSelectTab={(tab: HeaderTabs) =>
        history.push(AppRoutes.getPath('Box', {box: tab}))
      }
      onLogoutUser={() => dispatch(deleteUserLogin())}
      redirectOutline={redirectOutline}>
      {activeBox && activeBox.isFullyLoaded && activeBox.numArticles === 0 ? (
        <EmptyBox
          text={'🎉 You’ve hit inbox 0!'}
          imageSrc={ImageUtils.getImageUrl(imageNames.personInZenPose)}
        />
      ) : (
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
              ? activeBox.articles
                  .map((id) => articles[id])
                  .filter((val) => val)
              : []
          }
          activeStory={previewedArticle}
          onScrollEnd={() => getNextPageOfArticles(activeBox)}
        />
      )}
    </OutlineHeaderBody>
  )
}

export default withRouter(BoxPage)
