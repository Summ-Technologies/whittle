import {ArticleListResource, BoxesListResource} from '../../models/api'
import {WhittleBox} from '../../models/whittle'
import {WhittleAction} from '../actions'
import {ApiUtils} from '../actions/api'
import {
  GET_BOX_ARTICLES_SUCCESS,
  GET_USER_BOXES_SUCCESS,
  POST_USER_TRIAGE_SUCCESS,
} from '../actions/boxes'

export type BoxesState = {
  boxes: {[key: number]: WhittleBox}
}

const initialState: BoxesState = {
  boxes: {},
}

export default function boxesReducer(
  state: BoxesState = initialState,
  action: WhittleAction
): BoxesState {
  var payload
  var updatedBox: WhittleBox
  var boxId: number
  var articleId: number
  switch (action.type) {
    case GET_USER_BOXES_SUCCESS:
      payload = action.payload as BoxesListResource
      return {
        ...state,
        boxes: {...state.boxes, ...ApiUtils.listToDict(payload)},
      }
    case GET_BOX_ARTICLES_SUCCESS:
      payload = action.payload as ArticleListResource
      boxId = (action as {meta: number}).meta
      updatedBox = {
        ...state.boxes[boxId],
        articles: payload.map((articleResource) => articleResource.id),
      }
      return {
        ...state,
        boxes: {
          ...state.boxes,
          [boxId]: updatedBox,
        },
      }
    case POST_USER_TRIAGE_SUCCESS:
      articleId = (action as {meta: {boxId: number; articleId: number}}).meta
        .articleId
      boxId = (action as {meta: {boxId: number; articleId: number}}).meta.boxId
      // add article to new box
      let articlesList =
        state.boxes[boxId] && state.boxes[boxId].articles
          ? state.boxes[boxId].articles
          : []
      let updatedArticlesList = []
      if (articlesList) {
        let add = false
        if (!articlesList.includes(articleId)) {
          add = true
        }
        articlesList.forEach((articleId) => updatedArticlesList.push(articleId))
        if (add) {
          updatedArticlesList.push(articleId)
        }
      }
      updatedBox = {
        ...state.boxes[boxId],
        articles: updatedArticlesList,
      }

      // remove article from old box
      let updatedBox2: WhittleBox | undefined = undefined
      Object.keys(state.boxes).forEach((key) => {
        let _articles = state.boxes[parseInt(key)].articles
        let found = _articles ? _articles.includes(articleId) : false
        if (found) {
          let updatedArticlesList2 = _articles
            ? _articles.filter((val) => val !== articleId)
            : []
          updatedBox2 = {
            ...state.boxes[parseInt(key)],
            articles: updatedArticlesList2,
          }
        }
      })

      if (updatedBox2 !== undefined) {
        return {
          ...state,
          boxes: {
            ...state.boxes,
            [(updatedBox2 as WhittleBox).id]: updatedBox2,
            [boxId]: updatedBox,
          },
        }
      } else {
        return {
          ...state,
          boxes: {
            ...state.boxes,
            [boxId]: updatedBox,
          },
        }
      }
    default:
      return state
  }
}
