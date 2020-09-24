import {ArticleResource, BoxResource, UserResource} from './api'

export type WhittleBox = BoxResource & {
  // articles: list of article id's in order
  articles?: number[]
  // numArticles: total number of articles for the given box (not neccesarily equal to the length of articles list)
  numArticles: number
}
export type WhittleArticle = ArticleResource
export type WhittleUser = UserResource
