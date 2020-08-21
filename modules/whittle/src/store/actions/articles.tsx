import {createApiAction} from './api'

export const POST_TRIAGE_REQUEST = 'POST_TRIAGE_REQUEST'
export const POST_TRIAGE_SUCCESS = 'POST_TRIAGE_SUCCESS'
export const POST_TRIAGE_FAILURE = 'POST_TRIAGE_FAILURE'

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
