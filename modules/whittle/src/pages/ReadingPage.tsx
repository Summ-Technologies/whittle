import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom'
import StoryRowPreview from '../components/articles/StoryRowPreview'
import Body from '../components/common/Body'
import Header, {HeaderTabs} from '../components/common/Header'
import {WhittleArticle} from '../models/whittle'
import {AppRoutes} from '../stacks'
import {triageArticle} from '../store/actions/boxes'
import {getArticle} from '../store/getters/articles'
import {getBoxes, getInbox, getLibrary, getQueue} from '../store/getters/boxes'
import ArticleUtils from '../util/article'
import {useArticles} from '../util/hooks'

type ReadingPageProps = RouteComponentProps<{id: string}>

function ReadingPage(props: ReadingPageProps) {
  let dispatch = useDispatch()
  let boxes = useSelector(getBoxes)
  let inbox = useSelector(getInbox)
  let queue = useSelector(getQueue)
  let library = useSelector(getLibrary)
  let article = useSelector(getArticle(parseInt(props.match.params.id)))
  let history = useHistory()

  useArticles(dispatch, boxes)

  /** Dispatch article to archive box */
  function archiveArticle(article: WhittleArticle) {
    if (library && article) {
      dispatch(triageArticle(article.id, library.id))
    }
  }

  /** Dispatch article to library box */
  function queueArticle(article: WhittleArticle) {
    if (queue && article) {
      dispatch(triageArticle(article.id, queue.id))
    }
  }

  return (
    <Body>
      <Header
        inbox={inbox}
        queue={queue}
        library={library}
        activeTab={undefined}
        onSelectTab={(tab: HeaderTabs) =>
          history.push(AppRoutes.getPath('Home'))
        }
      />
      <Row>
        <Col md={{span: '10', offset: '1'}}>
          {article ? (
            <>
              <StoryRowPreview
                title={article.title}
                source={article.source}
                readingTime={
                  article && article.content
                    ? ArticleUtils.calculateReadingTime(article.content)
                    : 0
                }
                showTriage={true}
                onQueue={() => queueArticle(article)}
                onBookmark={() => archiveArticle(article)}
                onArchive={() => archiveArticle(article)}
              />

              <div
                dangerouslySetInnerHTML={{
                  __html: article.html_content,
                }}></div>
            </>
          ) : undefined}
        </Col>
      </Row>
    </Body>
  )
}

export default withRouter(ReadingPage)
