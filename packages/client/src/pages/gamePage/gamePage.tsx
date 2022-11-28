import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './tsgame-wave/store/store';
// import App from './App';
// import { Counter } from './features/counter/Counter';
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
    <Provider store={store}>
      <App />
    </Provider>
      {/* <Canvas ></Canvas> */}
    </div>
  );
}
