export type ArticleResource = {
  id: number
  title: string
  outline: string
  text_content?: string
  html_content: string
  source: string
  author?: string
  message_received_at?: number // UTC Timestamp
  tags: string[] // TODO remove this attribute (should be relation aka list of tag id's)
  bookmarked: boolean // TODO remove this attribute ?? maybe
}

export type ArticleResponse = {article: ArticleResource}
export type ArticleListResponse = {articles: ArticleResource[]}
export type ArticleIdsListResponse = {article_ids: number[]}

export type BoxResource = {
  id: number
  user_id: number
  name: string
}

export type BoxesListResponse = {boxes: BoxResource[]}

export type UserResource = {
  id: number
  email: string
  first_name: string
  last_name: string
}

export type UserResponse = {
  user: UserResource
}

export type UserConfigResource = {
  id: number
  user_id: number
  gmail_auto_archive: boolean
}

export type UserHomeResponse = {
  user: UserResource
  user_config: UserConfigResource
  boxes: BoxResource[]
  boxes_articles_count: {[key: number]: number}
}

export type UserArticleSearchResponse = {
  matches: {[key: number]: number[]} // boxId -> articleIds[]
  query: string
}

export type SignupResponse = {
  user: UserResource
  error?: string
  error_code?: string
}
