import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import '@/styles/index.scss'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

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
