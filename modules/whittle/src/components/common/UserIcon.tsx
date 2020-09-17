import React, {CSSProperties} from 'react'
import defaultStyles from '../../styles'

type UserIconProps = {
  imgUrl?: string
  firstName: string
  size?: number
  color: string
}

export default function UserIcon(props: UserIconProps) {
  let styles: {[key: string]: CSSProperties} = {
    container: {
      height: props.size ? props.size : 50,
      width: props.size ? props.size : 50,
      minWidth: props.size ? props.size : 50,
      minHeight: props.size ? props.size : 50,
      borderRadius: '50%',
      backgroundColor: props.color,
    },
    text: {
      textAlign: 'center',
      color: defaultStyles.colors.white,
      width: '100%',
      lineHeight: props.size ? `${props.size} px` : '50px',
      fontWeight: 'bold',
      fontSize: '1.2em',
    },
  }
  return props.imgUrl ? (
    <img src={props.imgUrl} alt="User profile icon" />
  ) : (
    <div style={styles.container}>
      <div style={styles.text}>
        {props.firstName.length > 0 ? props.firstName[0].toUpperCase() : '?'}
      </div>
    </div>
  )
}
