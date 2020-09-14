import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Redirect} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import AccountPage from './pages/AccountPage'
import AdminPage from './pages/AdminPage'
import GoogleAuthCallbackPage from './pages/GoogleAuthCallbackPage'
import HomePage from './pages/HomePage'
import AuthPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'
import ReadingPage from './pages/ReadingPage'
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
    {name: 'Account', path: '/account', component: AccountPage, showNav: false},
    {name: 'Admin', path: '/admin', component: AdminPage, showNav: false},
    {name: 'Read', path: '/read/:id', component: ReadingPage, showNav: false},
    {name: 'Box', path: '/b/:box', component: HomePage, showNav: false},
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
  let loginStatus = useSelector(getLoginStatus)
  let [stack, setStack] = useState(<LoggedInStack />)

  useEffect(() => {
    if (loginStatus === 'LOGGED_OUT') {
      setStack(<LoggedOutStack />)
    } else {
      setStack(<LoggedInStack />)
    }
  }, [loginStatus, setStack])

  return stack
}
