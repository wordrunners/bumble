import {
  Link,
} from "react-router-dom";
import './gamePage.scss';
import App from "./tsgame-wave";
// import { App } from "./tsgame/App"
// import { Canvas } from "./tsgame3/Canvas";


export function GamePage() {
  return (
    // <Canvas ></Canvas>
    
    <div className="game-page">
      <App></App>
      {/* <Canvas ></Canvas> */}
    </div>
  );
}
