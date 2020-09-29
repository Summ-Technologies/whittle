import React, {CSSProperties} from 'react'
import {WhittleArticle, WhittleArticleSearch} from '../../models/whittle'
import Row from '../common/Row'

type SearchScreenProps = {
  query: string
  articles: {[key: number]: WhittleArticle}
  search: {[key: number]: WhittleArticleSearch}
}

export default function SearchScreen(props: SearchScreenProps) {
  let styles: {[key: string]: CSSProperties} = {
    container: {},
  }
  return (
    <div style={styles.container}>
      <Row>Query: {props.query}</Row>
    </div>
  )
}
