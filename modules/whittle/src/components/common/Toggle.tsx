import React, {CSSProperties, SyntheticEvent} from 'react'
import defaultStyles from '../../styles'

type ToggleProps = {
  active: boolean
  height?: number
  onClick: (event: SyntheticEvent<HTMLDivElement>) => void
}

export default function Toggle(props: ToggleProps) {
  let defaultHeightPx = 30
  let height = props.height !== undefined ? props.height : defaultHeightPx
  let sliderFillPercent = 0.8
  let sliderHeight = height * sliderFillPercent
  let sliderMargin = height * ((1 - sliderFillPercent) / 2)
  let containerWidth = sliderHeight * 2
  let styles: {[key: string]: CSSProperties} = {
    container: {
      height: sliderHeight + sliderMargin * 2,
      width: containerWidth,
      cursor: 'pointer',
      borderRadius: '34px',
      transition: 'background-color .5s ease',
    },
    containerActive: {
      backgroundColor: defaultStyles.colors.main,
    },
    containerInactive: {
      backgroundColor: defaultStyles.colors.grey,
    },
    slider: {
      borderRadius: '50%',
      backgroundColor: defaultStyles.colors.white,
      height: sliderHeight,
      width: sliderHeight,
      marginTop: sliderMargin,
      marginBottom: sliderMargin,
      transition: 'left .5s ease',
      position: 'relative',
    },
    sliderActive: {
      left: containerWidth - sliderMargin - sliderHeight,
    },
    sliderInactive: {
      left: sliderMargin,
    },
  }
  return (
    <div
      onClick={props.onClick}
      style={{
        ...styles.container,
        ...(props.active ? styles.containerActive : styles.containerInactive),
      }}>
      <div
        style={{
          ...styles.slider,
          ...(props.active ? styles.sliderActive : styles.sliderInactive),
        }}></div>
    </div>
  )
}
