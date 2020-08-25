import React, {CSSProperties, useEffect, useState} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {useDispatch, useSelector} from 'react-redux'
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom'
import HelperPanel from '../components/articles/HelperPanel'
import StoriesList from '../components/articles/StoriesList'
import Body from '../components/common/Body'
import Header, {HeaderTabs} from '../components/common/Header'
import {WhittleArticle, WhittleBox} from '../models/whittle'
import {AppRoutes} from '../stacks'
import {triageArticle} from '../store/actions/boxes'
import {getArticles} from '../store/getters/articles'
import {getBoxes, getInbox, getLibrary, getQueue} from '../store/getters/boxes'
import {useArticles} from '../util/hooks'

const styles: {[key: string]: CSSProperties} = {
  rightPanelContainer: {height: '100%'},
  leftPanelContainer: {height: '100%', overflowX: 'scroll'},
}

type HomePageProps = RouteComponentProps<{box: string}>

function HomePage(props: HomePageProps) {
  let dispatch = useDispatch()
  let history = useHistory()
  let boxes = useSelector(getBoxes)
  let articles = useSelector(getArticles)
  let inbox = useSelector(getInbox)
  let queue = useSelector(getQueue)
  let library = useSelector(getLibrary)

  let activeTab = (HeaderTabs as ReadonlyArray<string>).includes(
    props.match.params.box
  )
    ? (props.match.params.box as HeaderTabs)
    : 'inbox'

  let [activeBox, setActiveBox] = useState<WhittleBox | undefined>(undefined)
  let [previewedArticle, setPreviewedArticle] = useState<
    WhittleArticle | undefined
  >(undefined)

  useArticles(dispatch, boxes)

  useEffect(() => {
    if (
      previewedArticle === undefined &&
      activeBox &&
      activeBox.articles &&
      activeBox.articles.length
    ) {
      let activeArticleId = activeBox.articles[0]
      let activeArticle = articles[activeArticleId]
      setPreviewedArticle(activeArticle)
    }
  }, [previewedArticle, setPreviewedArticle, activeBox, articles])

  useEffect(() => {
    switch (activeTab) {
      case 'inbox':
        setActiveBox(inbox)
        break
      case 'queue':
        setActiveBox(queue)
        break
      case 'library':
        setActiveBox(library)
        break
    }
  }, [activeTab, activeBox, setActiveBox, inbox, queue, library])

  /** Dispatch article to library box */
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
        activeTab={activeTab}
        onSelectTab={(tab: HeaderTabs) =>
          history.push(AppRoutes.getPath('Home', {box: tab}))
        }
      />
      <Row noGutters style={{flexGrow: 1}}>
        <Col xs={8} style={styles.rightPanelContainer}>
          <StoriesList
            onHoverArticle={(article: WhittleArticle) =>
              setPreviewedArticle(article)
            }
            onSelectArticle={(article: WhittleArticle) =>
              history.push(
                AppRoutes.getPath('Read', {id: article.id.toString()})
              )
            }
            onBookmarkArticle={archiveArticle}
            onQueueArticle={queueArticle}
            onArchiveArticle={archiveArticle}
            storiesList={
              activeBox && activeBox.articles
                ? activeBox.articles
                    .map((id) => articles[id])
                    .filter((val) => val)
                : []
            }
          />
        </Col>
        <Col xs={4} style={styles.rightPanelContainer}>
          <HelperPanel article={previewedArticle} />
        </Col>
      </Row>
    </Body>
  )
}

export default withRouter(HomePage)
