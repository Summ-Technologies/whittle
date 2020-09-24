import {
  ArticleIdsListResponse,
  BoxResource,
  UserHomeResponse,
} from '../../models/api'
import {WhittleBox} from '../../models/whittle'
import {WhittleAction} from '../actions'
import {ApiUtils} from '../actions/api'
import {
  GET_BOX_ARTICLE_IDS_SUCCESS,
  GET_USER_HOME_SUCCESS,
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
  var boxId: number
  var articleId: number
  switch (action.type) {
    case GET_USER_HOME_SUCCESS:
      payload = action.payload as UserHomeResponse
      let boxesArticlesCount = payload.boxes_articles_count
      let whittleBoxes: WhittleBox[] = payload.boxes.map((box: BoxResource) => {
        return {...box, numArticles: boxesArticlesCount[box.id]}
      })

      return {
        ...state,
        boxes: {...state.boxes, ...ApiUtils.listToDict(whittleBoxes)},
      }

    case GET_BOX_ARTICLE_IDS_SUCCESS:
      payload = action.payload as ArticleIdsListResponse
      boxId = (action as {meta: {boxId: number; pageNumber: number}}).meta.boxId
      return {
        ...state,
        boxes: {
          ...state.boxes,
          [boxId]: {
            ...state.boxes[boxId],
            articles: payload.article_ids,
            numArticles: payload.article_ids.length,
          },
        },
      }

    case POST_USER_TRIAGE_SUCCESS:
      payload = action.payload as ArticleIdsListResponse
      articleId = (action as {meta: {boxId: number; articleId: number}}).meta
        .articleId
      boxId = (action as {meta: {boxId: number; articleId: number}}).meta.boxId
      // remove article from old box
      let updatedOriginBox: WhittleBox | undefined = undefined
      Object.keys(state.boxes).forEach((key) => {
        let _articles = state.boxes[parseInt(key)].articles
        let found = _articles ? _articles.includes(articleId) : false
        if (found) {
          let updatedArticlesList2 = _articles
            ? _articles.filter((val) => val !== articleId)
            : []
          updatedOriginBox = {
            ...state.boxes[parseInt(key)],
            articles: updatedArticlesList2,
            numArticles: updatedArticlesList2.length,
          }
        }
      })

      // update origin box
      let updatedDestinationBox: WhittleBox = {
        ...state.boxes[boxId],
        articles: payload.article_ids,
        numArticles: payload.article_ids.length,
      }

      if (updatedOriginBox !== undefined) {
        return {
          ...state,
          boxes: {
            ...state.boxes,
            [(updatedOriginBox as WhittleBox).id]: updatedOriginBox,
            [boxId]: updatedDestinationBox,
          },
        }
      } else {
        return {
          ...state,
          boxes: {
            ...state.boxes,
            [boxId]: updatedDestinationBox,
          },
        }
      }
    default:
      return state
  }
}
