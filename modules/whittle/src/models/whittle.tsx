import {ArticleListResource, ArticleResource, BoxResource} from './api'

export type WhittleBox = BoxResource & {articles?: ArticleListResource}
export type WhittleArticle = ArticleResource
