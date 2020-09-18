import React, {CSSProperties, SyntheticEvent, useState} from 'react'
import defaultStyles from '../../styles'

type TextInputProps = {
  placeholder: string
  value: string
  onChangeValue: (newValue: string) => void
}

export default function TextInput(props: TextInputProps) {
  let [focused, setFocused] = useState(false)
  let styles: {[key: string]: CSSProperties} = {
    input: {
      width: '100%',
      fontSize: '.9em',
      color: defaultStyles.colors.grey,
      height: '100%',
      paddingLeft: 10,
      ...defaultStyles.roundedCorners,
      borderWidth: 1,
      borderColor: defaultStyles.colors.grey,
      ...defaultStyles.ellipsisOverflow,
      outline: 'none', // so no default styling is done
    },
    inputFocused: {
      borderColor: defaultStyles.colors.main,
      borderWidth: 2,
    },
  }
  return (
    <input
      style={{...styles.input, ...(focused ? styles.inputFocused : {})}}
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(target: SyntheticEvent<HTMLInputElement>) =>
        props.onChangeValue(target.currentTarget.value)
      }
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}
