import {RootState} from '..'
import {WhittleArticle, WhittleArticleSearch} from '../../models/whittle'

export function getArticlesData(
  state: RootState
): {[key: number]: WhittleArticle} {
  return state.articles.articles
}

export function getArticle(articleId: number) {
  function _getArticle(state: RootState): WhittleArticle {
    return getArticlesData(state)[articleId]
  }

  return _getArticle
}

export function getSearchResults(query: string) {
  function _getSearch(state: RootState): WhittleArticleSearch | undefined {
    return state.articles.search[query]
  }
  return _getSearch
}
