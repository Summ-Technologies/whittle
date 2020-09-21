import React, {CSSProperties} from 'react'
import {TooltipRenderProps} from 'react-joyride'
import defaultStyles from '../../styles'
import Button from '../common/Button'

type JoyrideModalProps = {} & TooltipRenderProps

export default function JoyrideModal(props: JoyrideModalProps) {
  let styles: {[key: string]: CSSProperties} = {
    container: {
      backgroundColor: defaultStyles.colors.white,
      padding: 20,
      maxWidth: 500,
      ...defaultStyles.roundedCorners,
      ...defaultStyles.defaultBoxShadow,
    },
    header: {
      ...defaultStyles.header,
      fontSize: '1.2em',
      textAlign: 'center',
      marginBottom: 5,
    },
    body: {...defaultStyles.body, textAlign: 'center', marginBottom: 10},
    buttonRow: {
      width: '100%',
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'space-around',
    },
    buttonContainer: {width: '40%'},
    backButton: {
      borderColor: defaultStyles.colors.main,
      borderWidth: 1,
      borderStyle: 'solid',
      color: defaultStyles.colors.main,
      backgroundColor: defaultStyles.colors.white,
    },
    nextButton: {},
  }
  return (
    <div {...props.tooltipProps} style={styles.container}>
      <div style={styles.header}>{props.step.title}</div>
      <div style={styles.body}>{props.step.content}</div>
      <div style={styles.buttonRow}>
        <div {...props.backProps} style={styles.buttonContainer} id="back">
          <Button
            onClick={() => undefined} // the onclick is handled in container div
            text="Back"
            style={styles.backButton}
          />
        </div>
        <div {...props.primaryProps} style={styles.buttonContainer} id="next">
          <Button
            onClick={() => undefined} // the onclick is handled in container div
            text="Next"
            style={styles.nextButon}
          />
        </div>
      </div>
    </div>
  )
}
