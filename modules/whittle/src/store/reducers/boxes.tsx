import {Action} from 'redux'
import {WhittleBox} from '../../models/whittle'

export type BoxesState = {
  boxes: {[key: number]: WhittleBox}
}

const initialState: BoxesState = {
  boxes: {},
}

export default function boxesReducer(
  state: BoxesState = initialState,
  action: Action
): BoxesState {
  switch (action.type) {
    default:
      return state
  }
}
