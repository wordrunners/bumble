import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import '@/styles/index.scss'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { RootState, setupStore } from '@/store/store'

const store = setupStore(window.__PRELOADED_STATE__)

declare global {
  interface Window {
    __PRELOADED_STATE__: RootState
  }
}

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
