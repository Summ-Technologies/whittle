import {
  ArticleResource,
  BoxResource,
  UserConfigResource,
  UserResource,
} from './api'

export type WhittleBox = BoxResource & {
  // articles: list of article id's in order
  articles?: number[]
  // numArticles: total number of articles for the given box (not neccesarily equal to the length of articles list)
  numArticles: number
}
export type WhittleArticle = ArticleResource
export type WhittleUser = UserResource
export type WhittleUserConfig = UserConfigResource

export type WhittleArticleSearch = {
  [key: number]: number[] // boxId -> articleId[]
}
