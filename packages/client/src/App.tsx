import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Router } from '@/pages'

export function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <div className="app">
      <RouterProvider router={Router} />
    </div>
  )
}
