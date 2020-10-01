import 'font-awesome/css/font-awesome.min.css'
import React, {CSSProperties} from 'react'
import TextInput from '../common/TextInput'

type SearchRowProps = {
  searchQuery: string
  setSearchQuery: (val: string) => void
}
export default function SearchRow(props: SearchRowProps) {
  let styles: {[key: string]: CSSProperties} = {
    container: {
      display: 'flex',
      height: 40,
      fontSize: 20,
      width: '100%',
      paddingLeft: 10,
      marginBottom: 20,
    },
    inputContainer: {
      fontFamily: 'Arial, FontAwesome',
      width: '40%',
    },
  }
  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <TextInput
          onChangeValue={props.setSearchQuery}
          placeholder="&#xF002; Search your library"
          value={props.searchQuery}
        />
      </div>
    </div>
  )
}
