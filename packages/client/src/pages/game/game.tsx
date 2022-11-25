import {
  Link,
} from "react-router-dom";
import './game.scss';
import App from "./tsgame-wave";
// import { App } from "./tsgame/App"
// import { Canvas } from "./tsgame3/Canvas";


export function GamePage() {
  return (
    // <Canvas ></Canvas>
    <App></App>
    // <div id="game">
    //   Pages:
    //   <App></Game>
    //   <Link
    //       to={`/`}
    //     >
    //       {<p>Карта сайта</p>}{" "}
    //   </Link>
    // </div>
  );
}
