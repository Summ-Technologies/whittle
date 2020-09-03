import {ArticleResource, BoxResource, UserResource} from './api'

export type WhittleBox = BoxResource & {articles?: number[]}
export type WhittleArticle = ArticleResource
export type WhittleUser = UserResource
