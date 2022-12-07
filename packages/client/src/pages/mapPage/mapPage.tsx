import { NavLink } from 'react-router-dom'
import './mapPage.scss'

export function MapPage() {
  return (
    <div className="map-page">
      Pages:
      <br />
      <nav>
        <NavLink to={`game`}>
          {<p>Механика игры на Canvas API - game-page</p>}
        </NavLink>
      </nav>
    </div>
  )
}
