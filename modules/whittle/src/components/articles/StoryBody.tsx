import React from 'react'

type StoryBodyProps = {
  html: string
}
export default function StoryBody(props: StoryBodyProps) {
  return <div dangerouslySetInnerHTML={{__html: props.html}}></div>
}
