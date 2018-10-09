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
import { loadState, saveState } from 'services/localStorageService'

const persistedState = {
  ...loadState(),
}

const store = configureStore(persistedState)

store.subscribe(
  debounce(() => {
    saveState(store.getState())
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
