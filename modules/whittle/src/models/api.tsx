export type ArticleResource = {
  id: number
  title: string
  outline: string
  text_content?: string
  html_content: string
  source: string
  author?: string
  tags: string[] // TODO remove this attribute (should be relation aka list of tag id's)
  bookmarked: boolean // TODO remove this attribute ?? maybe
}

export type ArticleResponse = {article: ArticleResource}
export type ArticleListResponse = {articles: ArticleResource[]}

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

export type UserHomeResponse = {
  user: UserResource
  boxes: BoxResource[]
  boxes_articles_count: {[key: number]: number}
}
