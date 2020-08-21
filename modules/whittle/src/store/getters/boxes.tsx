import {RootState} from '..'
import {WhittleBox} from '../../models/whittle'

export function getBoxes(state: RootState): {[key: number]: WhittleBox} {
  return state.boxes.boxes
}

export function getBox(boxId: number) {
  function _getBox(state: RootState): WhittleBox {
    return getBoxes(state)[boxId]
  }

  return _getBox
}
