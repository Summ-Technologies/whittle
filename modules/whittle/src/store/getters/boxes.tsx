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

export function getInbox(state: RootState): WhittleBox | undefined {
  let boxes = getBoxes(state)
  let boxList = Object.values(boxes).filter(
    (box) => box.name.toLowerCase() === 'inbox'
  )
  if (boxList.length) {
    return boxList[0]
  }
}

export function getQueue(state: RootState): WhittleBox | undefined {
  let boxes = getBoxes(state)
  let boxList = Object.values(boxes).filter(
    (box) => box.name.toLowerCase() === 'queue'
  )
  if (boxList.length) {
    return boxList[0]
  }
}

export function getLibrary(state: RootState): WhittleBox | undefined {
  let boxes = getBoxes(state)
  let boxList = Object.values(boxes).filter(
    (box) => box.name.toLowerCase() === 'library'
  )
  if (boxList.length) {
    return boxList[0]
  }
}
