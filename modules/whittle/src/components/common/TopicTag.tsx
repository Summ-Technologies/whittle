import React from 'react'

type TopicButtonProps = {
  name: String
}

export default function TopicButton(props: TopicButtonProps) {
  return <div style={{backgroundColor: 'gray'}}>{props.name}</div>
}
