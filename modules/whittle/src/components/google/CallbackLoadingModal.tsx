import React, {CSSProperties, useEffect, useState} from 'react'
import {Modal, Spinner} from 'react-bootstrap'
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
      let cycle = setTimeout(cycleDots, 1000)
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
      paddingTop: 40,
      display: 'flex',
      justifyContent: 'center',
    },
    spinnerContainer: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 50,
      paddingBottom: 50,
    },
    image: {height: '100%', marginLeft: 'auto', marginRight: 'auto'},
    paragraph: {textAlign: 'center', paddingBottom: 20},
    loading: {display: 'inline'},
    paragraphsContainer: {paddingTop: 50, marginLeft: 40, marginRight: 40},
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
        <div style={styles.paragraphsContainer}>
          {paragraphs.map((val: string, currIndex: number) => {
            return <div style={styles.paragraph}>{val}</div>
          })}
        </div>
        {props.includeLoadingDots ? (
          <div style={styles.spinnerContainer}>
            <Spinner animation="border" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  )
}
