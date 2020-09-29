import {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {Dispatch} from 'redux'
import {getSearch} from '../store/actions/articles'
import {getUserHome} from '../store/actions/boxes'
import {getSearchResults} from '../store/getters/articles'

export function useHome(dispatch: Dispatch<any>) {
  useEffect(() => {
    // Get all inboxes for user if not already loaded
    dispatch(getUserHome())
  }, [dispatch])
}

export function useSearch(dispatch: Dispatch<any>) {
  let timeoutRef = useRef<NodeJS.Timeout | null>(null)
  let [showSearchBar, setShowSearchBar] = useState(false)
  let [searchQuery, setSearchQuery] = useState('')
  let searchResults = useSelector(getSearchResults(searchQuery))

  // Dispatch search query to populate search entries by query
  useEffect(() => {
    function validateAndDispatchSearch(
      searchQuery: string,
      dispatch: Dispatch<any>
    ) {
      if (searchQuery.length && searchResults === undefined) {
        dispatch(getSearch(searchQuery))
      }
    }
    if (timeoutRef && timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      validateAndDispatchSearch(searchQuery, dispatch)
    }, 500)
  }, [dispatch, searchQuery, searchResults])

  return [
    showSearchBar,
    setShowSearchBar,
    searchQuery,
    setSearchQuery,
    searchResults,
  ] as const
}
