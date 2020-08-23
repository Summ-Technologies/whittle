import {createApiAction} from './api'

export const GET_USER_BOXES_REQUEST = 'GET_USER_BOXES_REQUEST'
export const GET_USER_BOXES_SUCCESS = 'GET_USER_BOXES_SUCCESS'
export const GET_USER_BOXES_FAILURE = 'GET_USER_BOXES_FAILURE'

export const GET_BOX_ARTICLES_REQUEST = 'GET_BOX_ARTICLES_REQUEST'
export const GET_BOX_ARTICLES_SUCCESS = 'GET_BOX_ARTICLES_SUCCESS'
export const GET_BOX_ARTICLES_FAILURE = 'GET_BOX_ARTICLES_FAILURE'

export const POST_USER_TRIAGE_REQUEST = 'POST_USER_TRIAGE_REQUEST'
export const POST_USER_TRIAGE_SUCCESS = 'POST_USER_TRIAGE_SUCCESS'
export const POST_USER_TRIAGE_FAILURE = 'POST_USER_TRIAGE_FAILURE'

export function getUserBoxes() {
  let endpoint = '/v1.0/user/boxes'
  return createApiAction({
    endpoint,
    method: 'GET',
    types: [
      GET_USER_BOXES_REQUEST,
      GET_USER_BOXES_SUCCESS,
      GET_USER_BOXES_FAILURE,
    ],
  })
}

export function getBoxArticles(boxId: number) {
  let endpoint = `/v1.0/user/boxes/${boxId}/articles`
  return createApiAction({
    endpoint,
    method: 'GET',
    types: [
      GET_USER_BOXES_REQUEST,
      {type: GET_BOX_ARTICLES_SUCCESS, meta: () => boxId},
      GET_USER_BOXES_FAILURE,
    ],
  })
}

export function triageArticle(articleId: number, boxId: number) {
  let endpoint = `/v1.0/user/triages`
  return createApiAction({
    endpoint,
    method: 'POST',
    body: JSON.stringify({boxId, articleId}),
    types: [
      POST_USER_TRIAGE_REQUEST,
      {
        type: POST_USER_TRIAGE_SUCCESS,
        meta: () => {
          return {articleId, boxId}
        },
      },
      POST_USER_TRIAGE_FAILURE,
    ],
  })
}
