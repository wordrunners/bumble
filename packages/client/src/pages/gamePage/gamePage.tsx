import { Link } from 'react-router-dom'
import './gamePage.scss'

export function GamePage() {
  return (
    <div className="game-page">
      Pages:
      <Link to={`/`}>{<p>Карта сайта</p>}</Link>
    </div>
  )
}
