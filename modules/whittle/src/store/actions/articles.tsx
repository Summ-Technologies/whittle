import {createApiAction} from './api'

export const POST_TRIAGE_REQUEST = 'POST_TRIAGE_REQUEST'
export const POST_TRIAGE_SUCCESS = 'POST_TRIAGE_SUCCESS'
export const POST_TRIAGE_FAILURE = 'POST_TRIAGE_FAILURE'

export const TOGGLE_BOOKMARK_REQUEST = 'TOGGLE_BOOKMARK_REQUEST'
export const TOGGLE_BOOKMARK_SUCCESS = 'TOGGLE_BOOKMARK_SUCCESS'
export const TOGGLE_BOOKMARK_FAILURE = 'TOGGLE_BOOKMARK_FAILURE'

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
 * TODO REMOVE THIS METHOD THIS IS A HACK ONLY FOR USER INTERVIEWS
 */
export function postArticle(
  title: string,
  subjectline: string,
  source: string,
  outline: string,
  content: string,
  tags: string
) {
  let endpoint = '/v1.0/user/admin/articles'
  return createApiAction({
    endpoint,
    method: 'POST',
    body: JSON.stringify({
      title,
      subjectline,
      source,
      content: outline,
      htmlContent: content,
      tags,
    }),
    types: [
      'POST_NEW_ARTICLE_REQUEST',
      'POST_NEW_ARTICLE_SUCCESS',
      'POST_NEW_ARTICLE_FAILURE',
    ],
  })
}
