import React from 'react'

type TopicTagProps = {
  name: String
}

export default function TopicTag(props: TopicTagProps) {
  return (
    <div
      style={{
        backgroundColor: '#C0C1CB',
        color: '#ffffff',
        fontWeight: 'bold',
        borderRadius: 6,
        marginRight: 6,
        paddingLeft: 7,
        paddingRight: 7,
      }}>
      {props.name}
    </div>
  )
}
