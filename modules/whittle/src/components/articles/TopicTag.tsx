import React from 'react'

type TopicTagProps = {
  name: String
}

export default function TopicTag(props: TopicTagProps) {
  return (
    <div
      style={{
        backgroundColor: '#E4E9EE',
        color: '#7F8791',
        fontSize: 13,
        fontWeight: 600,
        fontFamily: 'Inter',
        borderRadius: 10,
        marginRight: 6,
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
      }}>
      {props.name}
    </div>
  )
}
