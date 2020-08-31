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
  let [upColor, setUpColor] = useState<'#c4c4c4' | '#9f9f9f' | undefined>(
    undefined
  )
  let [downColor, setDownColor] = useState<'#c4c4c4' | '#9f9f9f' | undefined>(
    undefined
  )

  useEffect(() => {
    if (props.onPressUp === undefined) {
      setUpColor('#c4c4c4')
    } else if (buttonHovered === 'up') {
      setUpColor('#9f9f9f')
    } else {
      setUpColor(undefined)
    }
    if (props.onPressDown === undefined) {
      setDownColor('#c4c4c4')
    } else if (buttonHovered === 'down') {
      setDownColor('#9f9f9f')
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
        <FaArrowUp color={upColor} size={27} />
      </div>
      <div style={{height: 6}} />
      <div
        style={{
          ...styles.button,
          ...(props.onPressDown ? {} : styles.buttonDisabled),
        }}
        onMouseOver={() => setButtonHovered('down')}
        onMouseOut={() => setButtonHovered(undefined)}
        onClick={props.onPressDown}>
        <FaArrowDown color={downColor} size={27} />
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
    color: '#c4c4c4',
  },
  buttonDisabled: {
    cursor: 'not-allowed',
  },
}
