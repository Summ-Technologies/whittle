export type ArticleResource = {
  id: number
  user_id: number
  title: string
  subjectline: string
  content: string
  html_content: string
  source: string
}

export type ArticleListResource = ArticleResource[]

export type BoxResource = {
  id: number
  user_id: number
  name: string
}
