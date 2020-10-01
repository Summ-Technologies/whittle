import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom'
import EmptyBox from '../components/articles/EmptyBox'
import SearchRow from '../components/articles/SearchRow'
import StoriesList from '../components/articles/StoriesList'
import {HeaderTabs} from '../components/common/Header'
import OutlineHeaderBody from '../components/common/OutlineHeaderBody'
import config, {NUM_ARTICLES_PER_PAGE_KEY} from '../config'
import {WhittleArticle, WhittleBox} from '../models/whittle'
import {AppRoutes} from '../stacks'
import {getArticles, toggleBookmark} from '../store/actions/articles'
import {getBoxArticles, triageArticle} from '../store/actions/boxes'
import {deleteUserLogin, postUserSubscription} from '../store/actions/user'
import {getArticlesData} from '../store/getters/articles'
import {getInbox, getLibrary, getQueue} from '../store/getters/boxes'
import {getUser} from '../store/getters/user'
import {useHome, useSearch} from '../util/hooks'
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

  let [
    showSearchBar,
    setShowSearchBar,
    searchQuery,
    setSearchQuery,
    searchResults,
  ] = useSearch(dispatch)
  useHome(dispatch)

  useEffect(() => {
    if (searchResults && library && activeBox === library) {
      const loadedArticles = Object.keys(articles)
      let results = searchResults[library.id]
      if (results) {
        if (previewedArticle && !results.includes(previewedArticle.id)) {
          setPreviewedArticle(undefined)
        }
        let articlesToLoad: number[] = []
        for (let i = 0; i < results.length; i++) {
          let id = results[i]
          if (!loadedArticles.includes(id.toString())) {
            articlesToLoad.push(id)
            if (
              articlesToLoad.length >= config.get(NUM_ARTICLES_PER_PAGE_KEY)
            ) {
              break
            }
          }
        }
        if (articlesToLoad.length > 0) {
          // GET FIRST PAGE OF ARTICLES
          dispatch(getArticles(articlesToLoad))
        }
      }
    }
  }, [
    searchQuery,
    dispatch,
    articles,
    searchResults,
    activeBox,
    previewedArticle,
    library,
  ])

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
    if (searchResults && library && searchResults[library.id]) {
      articleList = []
      for (let i = 0; i < searchResults[library.id].length; i++) {
        let id = searchResults[library.id][i]
        let article = articles[id]
        if (article !== undefined) {
          articleList.push(article)
        } else {
          break
        }
      }
    }
    setStoriesList(articleList)
  }, [
    articles,
    activeBox,
    setStoriesList,
    getNextPageOfArticles,
    library,
    searchResults,
  ])

  useEffect(() => {
    if (searchResults && library && activeBox === library) {
      return
    }
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
  }, [
    previewedArticle,
    setPreviewedArticle,
    activeBox,
    articles,
    searchResults,
    library,
  ])

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

  useEffect(() => {
    setSearchQuery('')
    setShowSearchBar(false)
  }, [activeTab, setSearchQuery, setShowSearchBar])

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

  let showEmptyBox =
    activeBox && activeBoxFullyLoaded && activeBox.numArticles === 0
  let isLibrary = activeBox && activeBox.name.toLowerCase() === 'library'

  let emptyBox = (
    <EmptyBox
      text={'Nothing to see here'}
      imageSrc={ImageUtils.getImageUrl(imageNames.personInZenPose)}
    />
  )
  if (activeBox) {
    switch (activeBox.name.toLowerCase()) {
      case 'inbox':
        emptyBox = (
          <EmptyBox
            text={'🎉 You’ve hit inbox 0!'}
            imageSrc={ImageUtils.getImageUrl(imageNames.personInZenPose)}
          />
        )
        break
      case 'queue':
        emptyBox = (
          <EmptyBox
            text={'✅ You’ve finished your queue!'}
            imageSrc={ImageUtils.getImageUrl(imageNames.personWithArmsOpen)}
          />
        )
        break
      case 'library':
        emptyBox = (
          <EmptyBox
            text={
              '📚️ Add newsletters to your library and easily find them later!'
            }
            imageSrc={ImageUtils.getImageUrl(imageNames.personReadingNewspaper)}
          />
        )
        break
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
      redirectOutline={redirectOutline}
      //Search related
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      showSearchBar={showSearchBar}
      setShowSearchBar={setShowSearchBar}
      onAddNewsletterSubscription={(fromAddress: string) =>
        dispatch(postUserSubscription(fromAddress))
      }>
      {!showEmptyBox && isLibrary ? (
        <SearchRow searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      ) : undefined}
      {showEmptyBox ? (
        emptyBox
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
      {!showEmptyBox && isLibrary && !storiesList.length ? (
        <EmptyBox
          text={'No results match your search'}
          imageSrc={ImageUtils.getImageUrl(
            imageNames.confusedPersonWithGlasses
          )}
        />
      ) : undefined}
    </OutlineHeaderBody>
  )
}

export default withRouter(BoxPage)
