import querystring from 'querystring'
import {createApiAction} from './api'

export const POST_TRIAGE_REQUEST = 'POST_TRIAGE_REQUEST'
export const POST_TRIAGE_SUCCESS = 'POST_TRIAGE_SUCCESS'
export const POST_TRIAGE_FAILURE = 'POST_TRIAGE_FAILURE'

export const GET_ARTICLES_REQUEST = 'GET_ARTICLES_REQUEST'
export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS'
export const GET_ARTICLES_FAILURE = 'GET_ARTICLES_FAILURE'

export const TOGGLE_BOOKMARK_REQUEST = 'TOGGLE_BOOKMARK_REQUEST'
export const TOGGLE_BOOKMARK_SUCCESS = 'TOGGLE_BOOKMARK_SUCCESS'
export const TOGGLE_BOOKMARK_FAILURE = 'TOGGLE_BOOKMARK_FAILURE'

export const GET_SEARCH_REQUEST = 'GET_SEARCH_REQUEST'
export const GET_SEARCH_SUCCESS = 'GET_SEARCH_SUCCESS'
export const GET_SEARCH_FAILURE = 'GET_SEARCH_FAILURE'

/**
 * Gets article data for articles in given articleIds list
 */
export function getArticles(articleIds: number[]) {
  let endpoint = `/v1.0/user/articles?${querystring.stringify({articleIds})}`
  return createApiAction({
    endpoint,
    method: 'GET',
    types: [GET_ARTICLES_REQUEST, GET_ARTICLES_SUCCESS, GET_ARTICLES_FAILURE],
  })
}

/**
 * Creates a triage record, aka moves article with articleId in to box with boxId.
 */
export function postTriage(articleId: number, boxId: number) {
  let endpoint = '/v1.0/user/triages'
  return createApiAction({
    endpoint,
    method: 'POST',
    body: JSON.stringify({articleId, boxId}),
    types: [
      POST_TRIAGE_REQUEST,
      {
        type: POST_TRIAGE_SUCCESS,
        meta: () => {
          return {boxId, articleId}
        },
      },
      POST_TRIAGE_FAILURE,
    ],
  })
}

/**
 * Toggle bookmarked for article with articleId.
 */
export function toggleBookmark(articleId: number, doBookmark: boolean) {
  let endpoint = `/v1.0/user/articles/${articleId}/bookmark`
  return createApiAction({
    endpoint,
    method: doBookmark ? 'POST' : 'DELETE',
    types: [
      TOGGLE_BOOKMARK_REQUEST,
      TOGGLE_BOOKMARK_SUCCESS,
      TOGGLE_BOOKMARK_FAILURE,
    ],
  })
}

/**
 * Get search results for a given query
 */

export function getSearch(query: string) {
  let endpoint = `/v1.0/user/articles/search?${querystring.stringify({
    q: query,
  })}`
  return createApiAction({
    endpoint,
    method: 'GET',
    types: [GET_SEARCH_REQUEST, GET_SEARCH_SUCCESS, GET_SEARCH_FAILURE],
  })
}
