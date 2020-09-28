import React, {useState} from 'react'
import Joyride, {CallBackProps, EVENTS, Step} from 'react-joyride'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import StoriesList from '../components/articles/StoriesList'
import {HeaderTabs} from '../components/common/Header'
import OutlineHeaderBody from '../components/common/OutlineHeaderBody'
import JoyrideModal from '../components/onboarding/JoyrideModal'
import OnboardingImportCTA from '../components/onboarding/OnboardingImportCTA'
import {WhittleArticle, WhittleUser} from '../models/whittle'
import {connectGoogleAccountStep1} from '../store/actions/user'

function OnboardingPage() {
  let dispatch = useDispatch()
  let activeTab: HeaderTabs = 'inbox'
  let user: WhittleUser = {
    email: 'welcome@usewhittle.com',
    first_name: 'Welcome',
    last_name: 'User',
    id: 69,
  }
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
      title: 'Queue newsletters you want to read soon',
      content: 'Add newsletters to the queue by pressing the queue button',
    },
    {
      target: '.joyride-library',
      placement: 'bottom',
      disableBeacon: true,
      title: 'Your personal library',
      content:
        "Move newsletters you've read or don't have time to read to your library. Don't worry, it's easy to search for them later.",
    },
    {
      target: '.joyride-preview-outline',
      placement: 'left',
      disableBeacon: true,
      title: "Skip to what's important",
      content:
        'Click the outline to skip to relevant sections in each newsletter',
    },
    {
      target: '.joyride-settings',
      placement: 'right',
      disableBeacon: true,
      title: 'Add newsletters in settings',
      content:
        "Easily add newsletters that weren't imported in the settings panel.",
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
      user={user}
      inboxCount={inbox && inbox.articles ? inbox.articles.length : 0}
      queueCount={queue && queue.articles ? queue.articles.length : 0}
      libraryCount={library && library.articles ? library.articles.length : 0}
      article={previewedArticle}
      activeTab={activeTab}
      onSelectTab={(tab: HeaderTabs) => undefined}
      onLogoutUser={() => undefined}
      redirectOutline={() => undefined}>
      {joyrideTour === 1 ? (
        <Joyride
          callback={transitionToCTA}
          tooltipComponent={JoyrideModal}
          steps={onboardingHeaderSteps}
          scrollToFirstStep={true}
          continuous={true}
          showSkipButton={true}
          run={true}
        />
      ) : undefined}
      {joyrideTour === 2 ? (
        <OnboardingImportCTA
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
        onScrollEnd={() => undefined}
      />
    </OutlineHeaderBody>
  )
}
export default withRouter(OnboardingPage)
