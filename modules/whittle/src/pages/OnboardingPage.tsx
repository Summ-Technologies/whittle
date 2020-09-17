import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import Joyride, {CallBackProps, EVENTS, Step} from 'react-joyride'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import StoriesList from '../components/articles/StoriesList'
import {HeaderTabs} from '../components/common/Header'
import OutlineHeaderBody from '../components/common/OutlineHeaderBody'
import hoveredGmailConnectIcon from '../imgs/google-signin/btn_connect_gmail_dark_focus_web.png'
import gmailConnectIcon from '../imgs/google-signin/btn_connect_gmail_dark_normal_web.png'
import clickedGmailConnectIcon from '../imgs/google-signin/btn_connect_gmail_dark_pressed_web.png'
import {WhittleArticle} from '../models/whittle'
import {connectGoogleAccountStep1} from '../store/actions/user'

function OnboardingPage() {
  let dispatch = useDispatch()
  let activeTab: HeaderTabs = 'inbox'
  let [joyrideTour, setJoyrideTour] = useState<1 | 2>(1)

  // Fake data that we can play around with in onboarding
  let [articles, setArticles] = useState<{[key: number]: WhittleArticle}>({
    '-69': {
      bookmarked: false,
      outline:
        '[**1. Your newsletter inbox**]()  \n[**2. Move to queue**]()  \n[**3. Your personal library**]()  \n[**4. Bookmark for later**]()  \n[**5. Outline**]()',
      html_content: '<div><h2>Test header 1</h2><h2>Test header 2</h2></div>',
      id: -69,
      source: 'Whittle team',
      tags: ['Onboarding', 'Whittle'],
      title: 'Whittle onboarding newsletter',
    },
  })
  let inbox = {
    id: -69,
    name: 'Inbox',
    user_id: -69,
    articles: [-69],
  }
  let queue = {
    id: -69,
    name: 'Inbox',
    user_id: -69,
    articles: [],
  }

  let library = {
    id: -69,
    name: 'Inbox',
    user_id: -69,
    articles: [],
  }

  let activeBox = inbox

  let onboardingHeaderSteps: Step[] = [
    {
      target: 'body',
      placement: 'center',
      disableBeacon: true,
      title: 'Welcome to your new newsletter home!',
      content: "You're 1 minute away from less newsletter stress.",
    },
    {
      target: '.joyride-inbox',
      placement: 'bottom',
      disableBeacon: true,
      title: 'Your newsletter inbox',
      content: 'Quickly triage your newsletters into your queue and library',
    },
    {
      target: '.joyride-queue',
      placement: 'bottom',
      disableBeacon: true,
      title: 'Queue your newsletters to read soon',
      content: 'Add newsletters by tapping Q or pressing the queue button',
    },
    {
      target: '.joyride-library',
      placement: 'bottom',
      disableBeacon: true,
      title: 'Your personal library',
      content:
        "Press E to move newsletters you've read or don't have time to read to your library. Don't worry, it's easy to find these later.",
    },
    {
      target: '.joyride-bookmark',
      placement: 'bottom',
      disableBeacon: true,
      title: 'Bookmark for later',
      content:
        "Press B to bookmark a newsletter so it's easy to search for later.",
    },
    {
      target: '.joyride-preview-outline',
      placement: 'left',
      disableBeacon: true,
      title: "Skip to what's important",
      content: 'Click the outline to skip to sections within the newsletter',
    },
  ]
  let previewedArticle = articles[-69]

  function transitionToCTA(data: CallBackProps) {
    if (data.type === EVENTS.TOUR_END) {
      setJoyrideTour(2)
    }
  }

  return (
    <OutlineHeaderBody
      inboxCount={inbox && inbox.articles ? inbox.articles.length : 0}
      queueCount={queue && queue.articles ? queue.articles.length : 0}
      libraryCount={library && library.articles ? library.articles.length : 0}
      article={previewedArticle}
      activeTab={activeTab}
      onSelectTab={(tab: HeaderTabs) => undefined}>
      {joyrideTour === 1 ? (
        <Joyride
          callback={transitionToCTA}
          steps={onboardingHeaderSteps}
          scrollToFirstStep={true}
          continuous={true}
          showSkipButton={true}
          run={true}
          styles={{
            options: {
              primaryColor: '#9F8AFF',
              arrowColor: '#c4c4c4',
              textColor: '#000',
              width: 500,
              zIndex: 1000,
            },
          }}
        />
      ) : undefined}
      {joyrideTour === 2 ? (
        <CallToActionModal
          onConnectGmail={() => {
            dispatch(connectGoogleAccountStep1())
          }}
        />
      ) : undefined}
      <StoriesList
        onHoverArticle={(article: WhittleArticle) => undefined}
        onSelectArticle={() => undefined}
        onBookmarkArticle={(article, doBookmark) => {
          setArticles({'-69': {...article, bookmarked: doBookmark}})
        }}
        onQueueArticle={() => undefined}
        onArchiveArticle={() => undefined}
        storiesList={
          activeBox && activeBox.articles
            ? activeBox.articles.map((id) => articles[id]).filter((val) => val)
            : []
        }
        activeStory={previewedArticle}
      />
    </OutlineHeaderBody>
  )
}

type CTAProps = {onConnectGmail: () => void}

function CallToActionModal(props: CTAProps) {
  let [hovered, setHovered] = useState(false)
  let [clicked, setClicked] = useState(false)
  let [img, setImg] = useState(gmailConnectIcon)
  useEffect(() => {
    let _img = gmailConnectIcon
    if (clicked) {
      _img = clickedGmailConnectIcon
    } else if (hovered) {
      _img = hoveredGmailConnectIcon
    }
    setImg(_img)
  }, [hovered, clicked, setImg])
  return (
    <Modal show>
      <Modal.Header style={{textAlign: 'center', width: '100%'}}>
        <h2 style={{width: '100%'}}>Let's import your newsletters!</h2>
      </Modal.Header>
      <Modal.Body style={{textAlign: 'center'}}>
        <div>
          Connect your Google email to automatically import your newsletter
          subscriptions.
        </div>
        <img
          src={img}
          style={{marginTop: '20px', height: '60px', cursor: 'pointer'}}
          alt="Connect Google email account button"
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => {
            setHovered(false)
            setClicked(false)
          }}
          onClick={() => {
            setClicked(true)
            props.onConnectGmail()
          }}
        />
      </Modal.Body>
    </Modal>
  )
}

export default withRouter(OnboardingPage)
