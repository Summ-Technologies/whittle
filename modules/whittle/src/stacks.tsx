import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Redirect} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import ReadingPage from './pages/ReadingPage'

export type SummnRoute = {
  name: string
  path: string
  component: any
  showNav?: boolean
}

export class AppRoutes {
  static getPath(name: string, pathParams: {[key: string]: string} = {}) {
    let route = AppRoutes.routes.filter((route) => route.name === name)
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
    {name: 'Admin', path: '/admin', component: AdminPage, showNav: false},
    {name: 'Read', path: '/read/:id', component: ReadingPage, showNav: false},
    {name: 'Home', path: '/b/:box', component: HomePage, showNav: false},
    {
      name: 'RedirectInbox',
      path: '/*',
      component: <Redirect to="/b/inbox" />,
      showNav: false,
    },
  ]

  static loggedOutRoutes: SummnRoute[] = []
}

const loggedInSwitch = AppRoutes.routes.map((route) => (
  <Route path={route.path} key={route.name}>
    {route.component}
  </Route>
))

function LoggedInStack() {
  // const loggedInNav = AppRoutes.routes.filter((route) => route.showNav)
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
  let stack = false ? <LoggedOutStack /> : <LoggedInStack />

  useEffect(() => {}, [dispatch])

  return stack
}
