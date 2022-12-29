import { App } from './src/App'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import { StaticRouter } from 'react-router-dom/server'

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
  )
}
