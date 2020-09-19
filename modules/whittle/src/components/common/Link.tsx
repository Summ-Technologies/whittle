import React, {CSSProperties, SyntheticEvent, useState} from 'react'

type LinkProps = {
  text: string
  color?: string
  onClick: (event: SyntheticEvent<HTMLDivElement>) => void
}

export default function Link(props: LinkProps) {
  let [hovered, setHovered] = useState(false)
  let styles: {[key: string]: CSSProperties} = {
    link: {
      cursor: 'pointer',
      ...(props.color ? {color: props.color} : {}),
    },
    hovered: {
      textDecoration: 'underline',
    },
  }
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={props.onClick}
      style={{...styles.link, ...(hovered ? styles.hovered : {})}}>
      {props.text}
    </div>
  )
}
