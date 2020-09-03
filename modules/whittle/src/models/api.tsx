export type ArticleResource = {
  id: number
  user_id: number
  title: string
  subjectline: string
  content: string
  html_content: string
  source: string
  tags: string[] // TODO remove this attribute (should be relation aka list of tag id's)
  bookmarked: boolean // TODO remove this attribute ?? maybe
}

export type ArticleListResource = ArticleResource[]

export type BoxResource = {
  id: number
  user_id: number
  name: string
}

export type BoxesListResource = BoxResource[]

export type UserResource = {
  id: number
  email: string
  first_name: string
  last_name: string
}
