import {ArticleListResponse, ArticleResource} from '../../models/api'
import {WhittleArticle} from '../../models/whittle'
import {WhittleAction} from '../actions'
import {ApiUtils} from '../actions/api'
import {TOGGLE_BOOKMARK_SUCCESS} from '../actions/articles'
import {GET_BOX_ARTICLES_SUCCESS} from '../actions/boxes'

export type ArticlesState = {
  articles: {[key: number]: WhittleArticle}
}

const initialState: ArticlesState = {
  articles: {},
}

export default function articlesReducer(
  state: ArticlesState = initialState,
  action: WhittleAction
): ArticlesState {
  var payload
  switch (action.type) {
    case GET_BOX_ARTICLES_SUCCESS:
      payload = action.payload as ArticleListResponse
      return {
        ...state,
        articles: {...state.articles, ...ApiUtils.listToDict(payload.articles)},
      }
    case TOGGLE_BOOKMARK_SUCCESS:
      payload = action.payload as ArticleResource
      return {
        ...state,
        articles: {
          ...state.articles,
          [payload.id]: payload,
        },
      }
    default:
      return state
  }
}
