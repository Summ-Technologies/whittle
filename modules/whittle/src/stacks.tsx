import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import AccountPage from './pages/AccountPage'
import AdminPage from './pages/AdminPage'
import GoogleAuthCallbackPage from './pages/GoogleAuthCallbackPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
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
    let route = [...AppRoutes.routes, ...AppRoutes.loggedOutRoutes].filter(
      (route) => route.name.toLowerCase() === name.toLowerCase()
    )
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

  static routes: SummnRoute[] = [
    {name: 'Account', path: '/account', component: AccountPage, showNav: false},
    {
      name: 'GoogleCallback',
      path: '/auth/google/callback',
      component: GoogleAuthCallbackPage,
      showNav: false,
    },
    {name: 'Admin', path: '/admin', component: AdminPage, showNav: false},
    {name: 'Read', path: '/read/:id', component: ReadingPage, showNav: false},
    {name: 'Box', path: '/b/:box', component: HomePage, showNav: false},
    {
      name: 'RedirectInbox',
      path: '/*',
      component: <Redirect to="/b/inbox" />,
      showNav: false,
    },
  ]

  static loggedOutRoutes: SummnRoute[] = [
    {name: 'Login', path: '/login', component: LoginPage, showNav: false},
    {
      name: 'RedirectLogin',
      path: '/*',
      component: <Redirect to="/login" />,
      showNav: false,
    },
  ]
}

const loggedInSwitch = AppRoutes.routes.map((route) => (
  <Route path={route.path} key={route.name}>
    {route.component}
  </Route>
))

function LoggedInStack() {
  return (
    <>
      <Switch>{loggedInSwitch}</Switch>
    </>
  )
}

const loggedOutSwitch = AppRoutes.loggedOutRoutes.map((route) => (
  <Route path={route.path} key={route.name}>
    {route.component}
  </Route>
))

function LoggedOutStack() {
  return <Switch>{loggedOutSwitch}</Switch>
}

export default function Stack() {
  let dispatch = useDispatch()
  let loginStatus = useSelector(getLoginStatus)
  let stack =
    loginStatus === 'LOGGED_OUT' ? <LoggedOutStack /> : <LoggedInStack />

  useEffect(() => {}, [dispatch])

  return stack
}
