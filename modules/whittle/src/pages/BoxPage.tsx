import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom'
import EmptyBox from '../components/articles/EmptyBox'
import StoriesList from '../components/articles/StoriesList'
import {HeaderTabs} from '../components/common/Header'
import OutlineHeaderBody from '../components/common/OutlineHeaderBody'
import config, {NUM_ARTICLES_PER_PAGE_KEY} from '../config'
import {WhittleArticle, WhittleBox} from '../models/whittle'
import {AppRoutes} from '../stacks'
import {getArticles, toggleBookmark} from '../store/actions/articles'
import {getBoxArticles, triageArticle} from '../store/actions/boxes'
import {deleteUserLogin} from '../store/actions/user'
import {getArticlesData} from '../store/getters/articles'
import {getInbox, getLibrary, getQueue} from '../store/getters/boxes'
import {getUser} from '../store/getters/user'
import {useHome} from '../util/hooks'
import {imageNames, ImageUtils} from '../util/image'

type BoxPageProps = RouteComponentProps<{box: string}>

function BoxPage(props: BoxPageProps) {
  let dispatch = useDispatch()
  let history = useHistory()
  let articles = useSelector(getArticlesData)
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
  let [activeBoxFullyLoaded, setActiveBoxFullyLoaded] = useState(false)
  let [storiesList, setStoriesList] = useState<WhittleArticle[]>([])
  let [previewedArticle, setPreviewedArticle] = useState<
    WhittleArticle | undefined
  >(undefined)

  useHome(dispatch)
  /** Gets next page */
  let getNextPageOfArticles = useCallback(() => {
    const loadedArticles = Object.keys(articles)
    let articlesToLoad: number[] = []
    if (activeBox && activeBox.articles) {
      for (let i = 0; i < activeBox.articles.length; i++) {
        let id = activeBox.articles[i]
        if (!loadedArticles.includes(id.toString())) {
          articlesToLoad.push(id)
          if (articlesToLoad.length >= config.get(NUM_ARTICLES_PER_PAGE_KEY)) {
            break
          }
        }
      }
      if (articlesToLoad.length > 0) {
        // GET FIRST PAGE OF ARTICLES
        dispatch(getArticles(articlesToLoad))
      }
    }
  }, [articles, activeBox, dispatch])

  useEffect(() => {
    let articleList: WhittleArticle[] = []
    if (activeBox && activeBox.articles) {
      for (let i = 0; i < activeBox.articles.length; i++) {
        let id = activeBox.articles[i]
        let article = articles[id]
        if (article !== undefined) {
          articleList.push(article)
        } else {
          break
        }
      }
      if (articleList.length <= config.get(NUM_ARTICLES_PER_PAGE_KEY)) {
        getNextPageOfArticles()
      }
    }
    setStoriesList(articleList)
  }, [articles, activeBox, setStoriesList, getNextPageOfArticles])

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

  useEffect(() => {
    if (activeBox && activeBox.articles === undefined) {
      dispatch(getBoxArticles(activeBox.id))
    }
  }, [activeBox, getNextPageOfArticles, dispatch])

  useEffect(() => {
    if (activeBox && activeBox.articles) {
      let allLoaded = true
      const loadedArticles = Object.keys(articles)
      for (let i = 0; i < activeBox.articles.length; i++) {
        let id = activeBox.articles[i]
        if (!loadedArticles.includes(id.toString())) {
          allLoaded = false
          break
        }
      }
      setActiveBoxFullyLoaded(allLoaded)
    }
  }, [articles, activeBox, setActiveBoxFullyLoaded])

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
      {activeBox && activeBoxFullyLoaded && activeBox.numArticles === 0 ? (
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
          storiesList={storiesList}
          activeStory={previewedArticle}
          onScrollEnd={() => getNextPageOfArticles()}
        />
      )}
    </OutlineHeaderBody>
  )
}

export default withRouter(BoxPage)
