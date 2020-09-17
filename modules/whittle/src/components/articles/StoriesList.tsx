import React, {CSSProperties} from 'react'
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
}

export default function StoriesList(props: StoriesListProps) {
  let styles: {[key: string]: CSSProperties} = {
    storyRow: {
      cursor: 'pointer',
      borderBottomWidth: defaultStyles.defaultBorderWidth,
      borderBottomStyle: 'solid',
      borderBottomColor: defaultStyles.colors.lightGrey,
    },
    storyRowActive: {
      backgroundColor: defaultStyles.colors.lightGrey,
    },
  }

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
        key={index}>
        <td>
          <StoryRowPreview
            title={story.title}
            source={story.source}
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
      <tbody>{tableRows}</tbody>
    </Table>
  )
}
