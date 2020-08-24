import React from 'react'
import ReactMarkdown from 'react-markdown'
import './StoryBody.css'

type StoryBodyProps = {
  markdown: string
}
export default function StoryBody(props: StoryBodyProps) {
  return <ReactMarkdown className="story-content" source={props.markdown} />
}
