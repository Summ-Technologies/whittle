import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Table from 'react-bootstrap/Table'
import {WhittleArticle} from '../../models/whittle'
import defaultStyles from '../../styles'
import ArticleUtils from '../../util/article'
import StoryRowPreview from './StoryRowPreview'

type StoriesListProps = {
  storiesList: WhittleArticle[]
  activeStory?: WhittleArticle
  onSelectArticle: (article: WhittleArticle) => void
  onHoverArticle: (article: WhittleArticle) => void
  onBookmarkArticle: (article: WhittleArticle, doBookmark: boolean) => void
  onQueueArticle: (article: WhittleArticle) => void
  onArchiveArticle: (article: WhittleArticle) => void
  onScrollEnd: () => void
}

export default function StoriesList(props: StoriesListProps) {
  let [reachedBottom, setReachedBottom] = useState(false)
  let lastRowRef = useRef<HTMLTableRowElement>(null)
  let styles: {[key: string]: CSSProperties} = {
    storyRow: {
      cursor: 'pointer',
      borderBottomWidth: defaultStyles.defaultBorderWidth,
      borderBottomStyle: 'solid',
      borderBottomColor: defaultStyles.colors.lightGrey,
    },
    storyRowActive: {
      backgroundColor: defaultStyles.colors.lightBlue,
    },
  }

  let onScroll = useCallback(function onScroll() {
    if (lastRowRef && lastRowRef.current) {
      const rect = lastRowRef.current.getBoundingClientRect()
      const visible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      if (visible) {
        let isScrolled = lastRowRef.current.getAttribute('data-scrolled')
        if (isScrolled !== '1') {
          lastRowRef.current.setAttribute('data-scrolled', '1')
          setReachedBottom(true)
        }
      }
    }
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', onScroll, true)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  useEffect(() => {
    if (reachedBottom) {
      props.onScrollEnd()
      setReachedBottom(false)
    }
  }, [reachedBottom, setReachedBottom, props])

  const tableRows = props.storiesList.map((story, index) => {
    return (
      <tr
        style={{
          ...styles.storyRow,
          ...(props.activeStory && story.id === props.activeStory.id
            ? styles.storyRowActive
            : {}),
        }}
        onMouseOver={(
          event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
        ) => {
          props.onHoverArticle(story)
        }}
        ref={index === props.storiesList.length - 1 ? lastRowRef : undefined}
        key={story.id}>
        <td>
          <StoryRowPreview
            title={story.title}
            source={story.source}
            author={story.author ? story.author : ''}
            tags={story.tags ? story.tags : []}
            readingTime={
              story && story.html_content
                ? ArticleUtils.calculateReadingTime(story.html_content)
                : 0
            }
            showTriage={
              props.activeStory !== undefined &&
              props.activeStory.id === story.id
            }
            bookmarked={story.bookmarked}
            onSelect={() => props.onSelectArticle(story)}
            onToggleBookmark={(doBookmark: boolean) =>
              props.onBookmarkArticle(story, doBookmark)
            }
            onQueue={() => props.onQueueArticle(story)}
            onArchive={() => props.onArchiveArticle(story)}
          />
        </td>
      </tr>
    )
  })

  return (
    <Table responsive size="md">
      <tbody onScroll={onScroll}>{tableRows}</tbody>
    </Table>
  )
}
