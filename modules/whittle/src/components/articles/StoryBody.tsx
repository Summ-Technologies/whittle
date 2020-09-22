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
      let anchor = document.getElementById(props.anchor.replace('#', ''))
      if (anchor) {
        setScrollTop(anchor.offsetTop)
      }
    }
  }, [props.anchor, setScrollTop])

  useEffect(() => {
    if (props.scrollRef && props.scrollRef.current && scrollTop) {
      props.scrollRef.current.scrollTop = scrollTop
    }
  }, [scrollTop])
  return <div dangerouslySetInnerHTML={{__html: props.html}}></div>
}
