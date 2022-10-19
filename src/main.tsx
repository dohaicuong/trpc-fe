import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import { TodoRouterProvider } from './providers/TodoRouterProvider'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodoRouterProvider>
      <Suspense fallback='Loading...'>
        <App />
      </Suspense>
    </TodoRouterProvider>
  </React.StrictMode>
)
