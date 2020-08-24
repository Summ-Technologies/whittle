import {useEffect} from 'react'
import {Dispatch} from 'redux'
import {WhittleBox} from '../models/whittle'
import {getBoxArticles, getUserBoxes} from '../store/actions/boxes'

export function useArticles(
  dispatch: Dispatch<any>,
  boxes: {[key: number]: WhittleBox}
) {
  useEffect(() => {
    // Get all inboxes for user if not already loaded
    if (Object.keys(boxes).length === 0) {
      dispatch(getUserBoxes())
    } else {
      Object.keys(boxes).forEach((key) => {
        let box = boxes[parseInt(key)]
        if (!box.articles) {
          dispatch(getBoxArticles(box.id))
        }
      })
    }
  }, [dispatch, boxes])
}
