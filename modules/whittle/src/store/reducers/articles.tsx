import {Action} from 'redux'
import {WhittleArticle} from '../../models/whittle'

export type ArticlesState = {
  articles: {[key: number]: WhittleArticle}
}

const initialState: ArticlesState = {
  articles: {},
}

export default function articlesReducer(
  state: ArticlesState = initialState,
  action: Action
): ArticlesState {
  switch (action.type) {
    default:
      return state
  }
}
