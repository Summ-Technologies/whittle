import {ArticleResource, BoxResource, UserResource} from './api'

export type WhittleBox = BoxResource & {
  // articles: list of article id's in order
  articles?: number[]
  // numArticles: total number of articles for the given box (not neccesarily equal to the length of articles list)
  numArticles: number
  // page: most recent page of articles that have been loaded
  page?: number
  // isFullyLoaded: have all articles for the given box been loaded into articles list
  isFullyLoaded?: boolean
}
export type WhittleArticle = ArticleResource
export type WhittleUser = UserResource
