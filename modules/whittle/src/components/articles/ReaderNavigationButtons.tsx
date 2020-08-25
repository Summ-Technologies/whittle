import React, {CSSProperties, useEffect, useState} from 'react'
import {FaArrowDown, FaArrowUp} from 'react-icons/fa'

type ReaderNavigationButtonsProps = {
  onPressUp?: () => void
  onPressDown?: () => void
}

export default function ReaderNavigationButtons(
  props: ReaderNavigationButtonsProps
) {
  let [buttonHovered, setButtonHovered] = useState<'up' | 'down' | undefined>(
    undefined
  )
  let [upColor, setUpColor] = useState<'grey' | 'blue' | undefined>(undefined)
  let [downColor, setDownColor] = useState<'grey' | 'blue' | undefined>(
    undefined
  )

  useEffect(() => {
    if (props.onPressUp === undefined) {
      setUpColor('grey')
    } else if (buttonHovered === 'up') {
      setUpColor('blue')
    } else {
      setUpColor(undefined)
    }
    if (props.onPressDown === undefined) {
      setDownColor('grey')
    } else if (buttonHovered === 'down') {
      setDownColor('blue')
    } else {
      setDownColor(undefined)
    }
  }, [
    buttonHovered,
    props.onPressDown,
    props.onPressUp,
    setUpColor,
    setDownColor,
  ])

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.button,
          ...(props.onPressUp ? {} : styles.buttonDisabled),
        }}
        onMouseOver={() => setButtonHovered('up')}
        onMouseOut={() => setButtonHovered(undefined)}
        onClick={props.onPressUp}>
        <FaArrowUp color={upColor} size={30} />
      </div>
      <div
        style={{
          ...styles.button,
          ...(props.onPressDown ? {} : styles.buttonDisabled),
        }}
        onMouseOver={() => setButtonHovered('down')}
        onMouseOut={() => setButtonHovered(undefined)}
        onClick={props.onPressDown}>
        <FaArrowDown color={downColor} size={30} />
      </div>
    </div>
  )
}

const styles: {[key: string]: CSSProperties} = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    cursor: 'pointer',
  },
  buttonDisabled: {
    cursor: 'not-allowed',
  },
}
