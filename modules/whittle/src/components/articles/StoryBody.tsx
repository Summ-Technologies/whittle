import React, {useEffect, useState} from 'react'

type StoryBodyProps = {
  html: string
  anchor?: string
  scrollRef?: React.RefObject<HTMLDivElement>
}
export default function StoryBody(props: StoryBodyProps) {
  let [scrollTop, setScrollTop] = useState<number | undefined>(undefined)
  useEffect(() => {
    if (props.anchor) {
      let anchorTag = props.anchor
      // TODO REMOVE THIS. IT'S A HACK FOR YC DEMO
      setTimeout(() => {
        let anchor = document.getElementById(anchorTag.replace('#', ''))
        if (anchor) {
          setScrollTop(anchor.offsetTop)
        }
      }, 500)
    }
  }, [props.anchor, setScrollTop])

  useEffect(() => {
    if (props.scrollRef && props.scrollRef.current && scrollTop) {
      props.scrollRef.current.scrollTop = scrollTop
    }
  }, [scrollTop, props.scrollRef])
  return <div dangerouslySetInnerHTML={{__html: props.html}}></div>
}
