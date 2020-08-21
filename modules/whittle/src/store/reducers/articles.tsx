import {ArticleListResource} from '../../models/api'
import {WhittleArticle} from '../../models/whittle'
import {WhittleAction} from '../actions'
import {ApiUtils} from '../actions/api'
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
      payload = action.payload as ArticleListResource
      return {
        ...state,
        articles: {...state.articles, ...ApiUtils.listToDict(payload)},
      }
    default:
      return state
  }
}
