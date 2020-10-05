import {ConnectedRouter} from 'connected-react-router'
import React, {useEffect, useState} from 'react'
import {MixPanelProvider} from 'react-mixpanel-provider-component'
import {Provider} from 'react-redux'
import NoMobilePage from './pages/NoMobilePage'
import Stack from './stacks'
import store, {history} from './store'

export default function App() {
  ///////// Handle dimensions for covers page
  let [windowDimensions, setWindowDimensions] = useState<{
    height: number | null
    width: number | null
  }>({height: null, width: null})

  const hasWindow = typeof window !== 'undefined'
  useEffect(() => {
    function getWindowDimensions() {
      const width = hasWindow ? window.innerWidth : null
      const height = hasWindow ? window.innerHeight : null
      return {
        width,
        height,
      }
    }
    if (hasWindow) {
      setWindowDimensions(getWindowDimensions())
      const handleResize = () => setWindowDimensions(getWindowDimensions())
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [hasWindow])
  ///////// END Handle dimensions for covers page

  return (
    <Provider store={store}>
      <MixPanelProvider>
        <ConnectedRouter history={history}>
          {windowDimensions.width !== null && windowDimensions.width >= 768 ? (
            <Stack />
          ) : (
            <NoMobilePage />
          )}
        </ConnectedRouter>
      </MixPanelProvider>
    </Provider>
  )
}
