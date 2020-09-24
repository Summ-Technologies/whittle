import {RootState} from '..'
import {WhittleArticle} from '../../models/whittle'

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
