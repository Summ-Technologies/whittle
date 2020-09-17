import React, {CSSProperties, SyntheticEvent, useState} from 'react'
import defaultStyles from '../../styles'

type ButtonProps = {
  text: string
  onClick: (event: SyntheticEvent<HTMLDivElement>) => void
}

export default function Button(props: ButtonProps) {
  let [hovered, setHovered] = useState(false)
  let styles: {[key: string]: CSSProperties} = {
    button: {
      textAlign: 'center',
      color: defaultStyles.colors.white,
      backgroundColor: defaultStyles.colors.main,
      borderRadius: '5px',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: '5px',
      paddingBottom: '5px',
      cursor: 'pointer',
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
      style={{...styles.button, ...(hovered ? styles.hovered : {})}}>
      {props.text}
    </div>
  )
}
