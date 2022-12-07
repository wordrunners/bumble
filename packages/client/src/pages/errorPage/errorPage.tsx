import { useRouteError } from 'react-router-dom'
import './errorPage.scss'

export function ErrorPage() {
  const error: any = useRouteError()

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
