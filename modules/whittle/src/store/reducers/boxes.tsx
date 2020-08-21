import {ArticleListResource, BoxesListResource} from '../../models/api'
import {WhittleBox} from '../../models/whittle'
import {WhittleAction} from '../actions'
import {ApiUtils} from '../actions/api'
import {
  GET_BOX_ARTICLES_SUCCESS,
  GET_USER_BOXES_SUCCESS,
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
    default:
      return state
  }
}
