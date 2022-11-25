import React from "react";
import { useDimensions } from "./use-dimensions";
import { Canvas } from "./Canvas";
import { Hexagon } from "./Hexagon";
import { Hex } from "./Hex";
import { getHexagonsToFillZone } from "./random-helpers";
import "./styles.scss";

const App = () => {
  const [ref, { width, height, dpr }] = useDimensions();

  return (
    <main ref={ref}>
      {width === undefined || height === undefined || dpr === undefined ? (
        <div>{"🤔"}</div>
      ) : (
        <Canvas width={width} height={height} dpr={dpr} isAnimating={true}>
          {getHexagonsToFillZone({
            height: height * dpr,
            width: width * dpr
          }).map((hexagon, index) => (
            <Hexagon key={index} {...hexagon} />
          ))}
          {/* <Hex></Hex> */}
        </Canvas>
      )}
    </main>
  );
};

export default App;
