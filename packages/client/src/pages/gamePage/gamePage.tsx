<<<<<<< HEAD
<<<<<<< HEAD
=======
import React from 'react';
import { createRoot } from 'react-dom/client';
=======
>>>>>>> b408c01 (game)
import { Provider } from 'react-redux';
import { store } from './game/store/store';
import './gamePage.scss';
import { Canvas } from './game/components/canvas'

export function GamePage() {
  return (
    <div className="game-page">
      <Provider store={store}>
        {/* <h1>1231243123</h1> */}
        <Canvas />
      </Provider>
    </div>
  );
}
>>>>>>> f11144f (game)
