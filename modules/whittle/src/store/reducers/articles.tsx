import {ArticleListResponse, UserArticleSearchResponse} from '../../models/api'
import {WhittleArticle, WhittleArticleSearch} from '../../models/whittle'
import {WhittleAction} from '../actions'
import {ApiUtils} from '../actions/api'
import {GET_ARTICLES_SUCCESS, GET_SEARCH_SUCCESS} from '../actions/articles'

export type ArticlesState = {
  articles: {[key: number]: WhittleArticle}
  search: {[key: string]: WhittleArticleSearch} //query -> WhittleSearch
}

const initialState: ArticlesState = {
  articles: {},
  search: {},
}

export default function articlesReducer(
  state: ArticlesState = initialState,
  action: WhittleAction
): ArticlesState {
  var payload
  switch (action.type) {
    case GET_ARTICLES_SUCCESS:
      payload = action.payload as ArticleListResponse
      return {
        ...state,
        articles: {...state.articles, ...ApiUtils.listToDict(payload.articles)},
      }
    case GET_SEARCH_SUCCESS:
      payload = action.payload as UserArticleSearchResponse
      return {
        ...state,
        search: {
          ...state.search,
          [payload.query]: payload.matches,
        },
      }
    default:
      return state
  }
}
