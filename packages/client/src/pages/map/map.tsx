import {
  NavLink,
} from "react-router-dom";
import './map.scss';

export function MapPage() {
  return (
    <div id="map">
      Pages:
      <br/>
      <nav>
        <NavLink
          to={`game`}
        >
          {<p>Механика игры на Canvas API - game-page</p>}{" "}
        </NavLink>
        <NavLink
          to={`error`}
        >
          {<p>Заглушку страницы - error-page</p>}{" "}
        </NavLink>
      </nav>
    </div>
  );
}
