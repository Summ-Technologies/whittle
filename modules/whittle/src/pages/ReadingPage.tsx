import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom'
import ReadingHeader from '../components/articles/ReadingHeader'
import Body from '../components/common/Body'
import Header, {HeaderTabs} from '../components/common/Header'
import {AppRoutes} from '../stacks'
import {getArticle} from '../store/getters/articles'
import {getBoxes, getInbox, getLibrary, getQueue} from '../store/getters/boxes'
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
        <Col md={10}>
          {article ? (
            <>
              <ReadingHeader
                title={article.title}
                author={'Placeholder author'}
                publication={article.source}
                readingMins={6}
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
