import React, {useEffect, useState} from 'react'
import {useMixPanel} from 'react-mixpanel-provider-component'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, useHistory} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import {MixpanelUtils} from './analytics/mixpanel'
import config, {MIXPANEL_PROJECT_TOKEN_KEY} from './config'
import BoxPage from './pages/BoxPage'
import GoogleAuthCallbackPage from './pages/GoogleAuthCallbackPage'
import AuthPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'
import ReadingPage from './pages/ReadingPage'
import {analyticsPageView} from './store/actions/analytics'
import {getLoginStatus} from './store/getters/user'

export type SummnRoute = {
  name: string
  path: string
  component: any
  showNav?: boolean
}

export class AppRoutes {
  static getPath(name: string, pathParams: {[key: string]: string} = {}) {
    let route = [
      ...AppRoutes._routes,
      ...AppRoutes.routes,
      ...AppRoutes.loggedOutRoutes,
    ].filter((route) => route.name.toLowerCase() === name.toLowerCase())
    if (route.length !== 1) {
      throw Error("Can't get path for route named: " + name)
    }
    let path = route[0].path
    Object.keys(pathParams).forEach((key) => {
      let value = pathParams[key]
      let toReplace = ':' + key
      path = path.replace(toReplace, value)
    })
    return path
  }

  /**
   * _routes: routes that apply to logged in stack and logged out stack
   */
  static _routes: SummnRoute[] = [
    {
      name: 'GoogleCallback',
      path: '/auth/google/callback/:type',
      component: GoogleAuthCallbackPage,
      showNav: false,
    },
  ]

  static routes: SummnRoute[] = [
    {name: 'Read', path: '/read/:id', component: ReadingPage, showNav: false},
    {name: 'Box', path: '/b/:box', component: BoxPage, showNav: false},
    {
      name: 'Onboarding',
      path: '/onboarding',
      component: OnboardingPage,
      showNav: false,
    },

    {
      name: 'RedirectInbox',
      path: '/*',
      component: <Redirect to="/b/inbox" />,
      showNav: false,
    },
  ]

  static loggedOutRoutes: SummnRoute[] = [
    {
      name: 'UserAuth',
      path: '/auth',
      component: AuthPage,
      showNav: false,
    },

    {
      name: 'RedirectSignup',
      path: '/*',
      component: <Redirect to="/auth" />,
      showNav: false,
    },
  ]
}

const genericSwitch = AppRoutes._routes.map((route) => (
  <Route path={route.path} key={route.name}>
    {route.component}
  </Route>
))

const loggedInSwitch = AppRoutes.routes.map((route) => (
  <Route path={route.path} key={route.name}>
    {route.component}
  </Route>
))

function LoggedInStack() {
  return (
    <>
      <Switch>
        {genericSwitch}
        {loggedInSwitch}
      </Switch>
    </>
  )
}

const loggedOutSwitch = AppRoutes.loggedOutRoutes.map((route) => (
  <Route path={route.path} key={route.name}>
    {route.component}
  </Route>
))

function LoggedOutStack() {
  return (
    <Switch>
      {genericSwitch}
      {loggedOutSwitch}
    </Switch>
  )
}

export default function Stack() {
  let dispatch = useDispatch()
  let history = useHistory()
  let loginStatus = useSelector(getLoginStatus)
  let [stack, setStack] = useState(<LoggedInStack />)

  let {mixpanel} = useMixPanel()

  useEffect(() => {
    if (loginStatus === 'LOGGED_OUT') {
      setStack(<LoggedOutStack />)
    } else {
      setStack(<LoggedInStack />)
    }
  }, [loginStatus, setStack])

  useEffect(() => {
    if (config.get(MIXPANEL_PROJECT_TOKEN_KEY) !== undefined) {
      mixpanel.init(config.get(MIXPANEL_PROJECT_TOKEN_KEY) as string)
      MixpanelUtils.mixpanelInitialized = true
    }
  }, [mixpanel])

  useEffect(() => {
    let trackPageView = () =>
      dispatch(
        analyticsPageView(
          window.location.pathname,
          window.location.search,
          window.location.hash
        )
      )
    trackPageView()
    history.listen(trackPageView)
  }, [history, dispatch])

  return stack
}
