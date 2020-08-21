import {ArticleResource, BoxResource} from './api'

export type WhittleBox = BoxResource & {articles?: number[]}
export type WhittleArticle = ArticleResource
