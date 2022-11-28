<<<<<<< HEAD
=======
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './game/store/store';
// import App from './App';
// import { Counter } from './features/counter/Counter';
import App from "./game";
// import { App } from "./tsgame/App"
// import { Canvas } from "./tsgame3/Canvas";
import './gamePage.scss';


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
>>>>>>> f11144f (game)
