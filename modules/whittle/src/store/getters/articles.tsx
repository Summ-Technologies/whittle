import {RootState} from '..'
import {WhittleArticle} from '../../models/whittle'

export function getArticles(state: RootState): {[key: number]: WhittleArticle} {
  return state.articles.articles
}

export function getArticle(articleId: number) {
  function _getArticle(state: RootState): WhittleArticle {
    return getArticles(state)[articleId]
  }

  return _getArticle
}
