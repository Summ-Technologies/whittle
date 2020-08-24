import React, {CSSProperties, useState} from 'react'
import Table from 'react-bootstrap/Table'
import {WhittleArticle} from '../../models/whittle'
import ArticleUtils from '../../util/article'
import StoryRowPreview from './StoryRowPreview'

type StoriesListProps = {
  storiesList: WhittleArticle[]
  onSelectArticle: (article: WhittleArticle) => void
  onHoverArticle: (article: WhittleArticle) => void
  onBookmarkArticle: (article: WhittleArticle) => void
  onQueueArticle: (article: WhittleArticle) => void
  onArchiveArticle: (article: WhittleArticle) => void
}

export default function StoriesList(props: StoriesListProps) {
  const styles: {[key: string]: CSSProperties} = {
    storyRow: {
      cursor: 'pointer',
      borderBottom: '1px solid #dee2e6',
      borderTop: '0px solid',
    },
  }

  let [activeStory, setActiveStory] = useState<WhittleArticle | undefined>(
    undefined
  )

  const tableRows = props.storiesList.map((story, index) => {
    return (
      <tr
        style={styles.storyRow}
        onMouseOver={(
          event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
        ) => {
          props.onHoverArticle(story)
          setActiveStory(story)
        }}
        key={index}>
        <td>
          <StoryRowPreview
            title={story.title}
            source={story.source}
            readingTime={
              activeStory && activeStory.content
                ? ArticleUtils.calculateReadingTime(activeStory.content)
                : 0
            }
            showTriage={activeStory === story}
            onSelect={() => props.onSelectArticle(story)}
            onBookmark={() => props.onBookmarkArticle(story)}
            onQueue={() => props.onQueueArticle(story)}
            onArchive={() => props.onArchiveArticle(story)}
          />
        </td>
      </tr>
    )
  })

  return (
    <Table responsive hover size="md">
      <tbody>{tableRows}</tbody>
    </Table>
  )
}
