import {Dict} from 'mixpanel-browser'
import {Dispatch} from 'react'
import Mixpanel from 'react-mixpanel-provider-component'
import {Action, Middleware, MiddlewareAPI} from 'redux'
import {SignupResponse} from '../models/api'
import {RootState} from '../store'
import {WhittleAction} from '../store/actions'
import {
  AnalyticsAction,
  ANALYTICS_ONBOARDING_STEP,
  ANALYTICS_PAGE_VIEW,
} from '../store/actions/analytics'
import {
  GET_USER_HOME_SUCCESS,
  POST_USER_TRIAGE_SUCCESS,
} from '../store/actions/boxes'
import {
  DELETE_LOGOUT_SUCCESS,
  GOOGLE_SIGNUP_CALLBACK_SUCCESS,
  SET_LOGGED_OUT,
} from '../store/actions/user'
import {getInbox, getLibrary, getQueue} from '../store/getters/boxes'

type MixpanelConfigOption = {
  eventName: string // used as mixpanel event name
  getProperties?: (state: RootState, action: Action<any>) => Dict // properties to send to mixpanel
  skip?: (state: RootState, action: Action<any>) => boolean // condition suppresses the tracking event
}

// actionType -> MixpanelConfig[]
//    (an array allows multiple events dispatched per actionType)
type MixpanelConfig = {[key: string]: MixpanelConfigOption[]}

export class MixpanelUtils {
  // Was mixpanel intialized with API key?
  static mixpanelInitialized = false

  static trackEvent = (
    /**
     * Dispatch track event (or don't)
     * based on the current mixpanelConfig,
     * and action/store passed through middleware
     */
    mixpanelConfig: MixpanelConfig,
    action: Action<any>,
    store: MiddlewareAPI<any, RootState>
  ): void => {
    let configOptions = mixpanelConfig[action.type]
    if (configOptions !== undefined) {
      configOptions.forEach((configOption: MixpanelConfigOption) => {
        let {eventName, getProperties, skip} = configOption
        let doSkip: boolean = skip ? skip(store.getState(), action) : false
        if (!doSkip) {
          let properties: Dict | undefined = getProperties
            ? getProperties(store.getState(), action)
            : undefined
          Mixpanel.track(eventName, properties)
        }
      })
    } else {
      Mixpanel.track(action.type)
    }
  }

  /*
  Common methods for config options
  */

  static getPropsFromAnalyticsAction = (
    state: RootState,
    action: Action<any>
  ): Dict => {
    return (action as AnalyticsAction).props
  }

  static genericMixpanelConfigOption(eventName: string): MixpanelConfigOption {
    return {eventName}
  }
  /*
  End common methods for config options 
  */

  /*
  MixPanelConfigOptions
  */
  static boxSizesMixpanelConfigOption: MixpanelConfigOption = {
    eventName: 'BOX_SIZES',
    getProperties: (state, action) => {
      let inbox = getInbox(state)
      let library = getLibrary(state)
      let queue = getQueue(state)
      let ret: Dict = {}
      if (inbox) ret['inbox'] = inbox.numArticles
      if (library) ret['library'] = library.numArticles
      if (queue) ret['queue'] = queue.numArticles
      return ret
    },
  }
  static triageMixPanelConfigOption: MixpanelConfigOption = {
    eventName: POST_USER_TRIAGE_SUCCESS,
    getProperties: (state, action) => {
      let meta = (action as {
        meta: {boxId: number; articleId: number}
        type: string
      }).meta
      let {boxId, articleId} = meta
      let box = state.boxes.boxes[boxId]
      let article = state.articles.articles[articleId]
      return {
        articleId,
        boxId,
        boxName: box.name,
        articleSource: article.source,
      }
    },
  }
  static onboardingStepMixpanelConfigOption: MixpanelConfigOption = {
    eventName: ANALYTICS_ONBOARDING_STEP,
    getProperties: MixpanelUtils.getPropsFromAnalyticsAction,
  }
  static pageViewMixpanelConfigOption: MixpanelConfigOption = {
    eventName: ANALYTICS_PAGE_VIEW,
    getProperties: MixpanelUtils.getPropsFromAnalyticsAction,
  }
  static googleSignupMixpanelConfigOption: MixpanelConfigOption = {
    eventName: GOOGLE_SIGNUP_CALLBACK_SUCCESS,
    getProperties: (state, action) => {
      let payload = (action as WhittleAction).payload as SignupResponse
      let ret = {newAccount: true}
      if (payload.error_code === '1002') {
        ret = {newAccount: false}
      }
      return ret
    },
  }
  /*
  End MixPanelConfigOptions
  */

  // Config
  static mixpanelConfig: MixpanelConfig = {
    GOOGLE_SIGNUP_CALLBACK_SUCCESS: [
      MixpanelUtils.googleSignupMixpanelConfigOption,
    ],
    GET_USER_HOME_SUCCESS: [
      MixpanelUtils.genericMixpanelConfigOption(GET_USER_HOME_SUCCESS),
      MixpanelUtils.boxSizesMixpanelConfigOption,
    ],
    POST_USER_TRIAGE_SUCCESS: [
      MixpanelUtils.triageMixPanelConfigOption,
      MixpanelUtils.boxSizesMixpanelConfigOption,
    ],
    ANALYTICS_ONBOARDING_STEP: [
      MixpanelUtils.onboardingStepMixpanelConfigOption,
    ],
    ANALYTICS_PAGE_VIEW: [MixpanelUtils.pageViewMixpanelConfigOption],
  }
}

export const mixpanelMiddleware: Middleware = (store: MiddlewareAPI<any>) => (
  next: Dispatch<any>
) => (action: Action<any>) => {
  let result = next(action)
  if (action && action.type !== undefined) {
    if (MixpanelUtils.mixpanelInitialized) {
      mixpanelReducerMiddleware(action, store)
    }
  }
  return result
}

function mixpanelReducerMiddleware(
  action: Action<any>,
  store: MiddlewareAPI<any, RootState>
) {
  switch (action.type as string) {
    // Custom lifecycle related Mixpanel actions
    case GET_USER_HOME_SUCCESS:
      let userState = store.getState().user
      if (userState.user && Mixpanel.get_distinct_id() !== userState.user.id) {
        Mixpanel.identify(userState.user.id.toString())
      }
      break
    case DELETE_LOGOUT_SUCCESS:
    case SET_LOGGED_OUT:
      if (Mixpanel.get_distinct_id()) {
        Mixpanel.identify(undefined)
      }
      break
    // End Custom lifecycle related Mixpanel actions
    default:
      // Default handling of actions for Mixpanel
      MixpanelUtils.trackEvent(MixpanelUtils.mixpanelConfig, action, store)
      break
  }
}
