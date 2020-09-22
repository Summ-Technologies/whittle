import {useEffect} from 'react'
import {Dispatch} from 'redux'
import {getUserHome} from '../store/actions/boxes'

export function useHome(dispatch: Dispatch<any>) {
  useEffect(() => {
    // Get all inboxes for user if not already loaded
    dispatch(getUserHome())
  }, [dispatch])
}
