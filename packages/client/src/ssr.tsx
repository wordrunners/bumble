import { App } from './App'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { setupStore } from '@/store/store'
import { StaticRouter } from 'react-router-dom/server'

export const store = setupStore()

export function render(url: string | Partial<Location>) {
  return renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
  )
}
