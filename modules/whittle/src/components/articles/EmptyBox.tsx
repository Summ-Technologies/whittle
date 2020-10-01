import React, {CSSProperties} from 'react'
import defaultStyles from '../../styles'

type EmptyBoxProps = {text: string; imageSrc: string}

export default function EmptyBox(props: EmptyBoxProps) {
  let styles: {[key: string]: CSSProperties} = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 15,
      width: '90%',
      height: '50%',
      maxHeight: '400px',
      ...defaultStyles.defaultBoxShadow,
      ...defaultStyles.roundedCorners,
    },
    imgContainer: {
      height: '70%',
      marginBottom: 10,
    },
    img: {
      height: '100%',
      maxWidth: '100%',
    },
    text: {
      ...defaultStyles.body,
      fontSize: '2em',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  }
  return (
    <div style={styles.container}>
      <div style={styles.imgContainer}>
        <img style={styles.img} src={props.imageSrc} alt={'Person'} />
      </div>
      <div style={styles.text}>{props.text}</div>
    </div>
  )
}
