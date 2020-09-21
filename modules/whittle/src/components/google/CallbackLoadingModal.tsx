import React, {CSSProperties, useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {imageNames, ImageUtils} from '../../util/image'

type CallbackLoadingModalProps = {
  text: string | string[]
  includeLoadingDots?: boolean
}
export default function CallbackLoadingModal(props: CallbackLoadingModalProps) {
  let [dots, setDots] = useState<'' | '.' | '..' | '...'>('')

  useEffect(() => {
    function cycleDots() {
      switch (dots) {
        case '':
          setDots('.')
          break
        case '.':
          setDots('..')
          break
        case '..':
          setDots('...')
          break
        case '...':
          setDots('')
          break
      }
    }
    if (props.includeLoadingDots) {
      let cycle = setTimeout(cycleDots, 500)
      return () => clearTimeout(cycle)
    }
  }, [dots, setDots, props.includeLoadingDots])
  let paragraphs: string[] = Array.isArray(props.text)
    ? props.text
    : [props.text]
  let styles: {[key: string]: CSSProperties} = {
    container: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    imageContainer: {
      height: '200px',
      display: 'flex',
      justifyContent: 'center',
    },
    image: {height: '100%', marginLeft: 'auto', marginRight: 'auto'},
    paragraph: {textAlign: 'center'},
    loading: {display: 'inline'},
  }
  return (
    <Modal show>
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          <img
            src={ImageUtils.getImageUrl(imageNames.personWorkingOnComputer)}
            alt="Person working on computer"
            style={styles.image}
          />
        </div>
        {paragraphs.map((val: string, currIndex: number) => {
          let _val = val
          if (props.includeLoadingDots && currIndex === paragraphs.length - 1) {
            _val += dots
          }
          return <div style={styles.paragraph}>{_val}</div>
        })}
      </div>
    </Modal>
  )
}
