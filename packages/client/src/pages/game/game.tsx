import {
  Link,
} from "react-router-dom";
import './game.scss';

export function GamePage() {
  return (
    <div id="game">
      Pages:
      <Link
          to={`/`}
        >
          {<p>Карта сайта</p>}{" "}
      </Link>
    </div>
  );
}
