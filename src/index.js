import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'store'
import Routes from 'routes'
import 'styles/global-styles'
import registerServiceWorker from 'utils/registerServiceWorker'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import debounce from 'lodash/debounce'
import { loadVideos, saveVideos } from 'services/localStorageService'

const persistedState = {
  videos: loadVideos(),
}

const store = configureStore(persistedState)

store.subscribe(
  debounce(() => {
    saveVideos(store.getState().videos)
  }),
  1000
)

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
