import React, {CSSProperties, SyntheticEvent, useState} from 'react'
import defaultStyles from '../../styles'

type ButtonProps = {
  text: string
  onClick: (event: SyntheticEvent<HTMLDivElement>) => void
  style?: CSSProperties
}

export default function Button(props: ButtonProps) {
  let [hovered, setHovered] = useState(false)
  let styles: {[key: string]: CSSProperties} = {
    button: {
      textAlign: 'center',
      color: defaultStyles.colors.white,
      backgroundColor: defaultStyles.colors.main,
      ...defaultStyles.roundedCorners,
      height: '100%',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '100%',
      paddingLeft: 5, // essentially min padding
      paddingRight: 5,
    },
    hovered: {
      textDecoration: 'underline',
    },
    text: {
      paddingLeft: 5, // essentially min padding
      paddingRight: 5,
    },
  }
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={props.onClick}
      style={{
        ...styles.button,
        ...(hovered ? styles.hovered : {}),
        ...(props.style ? props.style : {}),
      }}>
      <div style={styles.text}>{props.text}</div>
    </div>
  )
}
