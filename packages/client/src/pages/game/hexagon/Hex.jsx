import { useCanvas } from "./Canvas";

export const Hex = ({ x, y, size, color, rotation }) => {
  const context = useCanvas();

  if (context !== null) {
    // const edgeLength = size * 0.5;

    // context.beginPath();
    // This article explains all the math behind hexagons
    // https://www.redblobgames.com/grids/hexagons/
    // const context = canvasRef.current.getContext("2d");
    // moving our hand to the starting position
    context.moveTo(111 / 4, 111 / 2);
    // drawing the blueprint line to the finishing position
    context.lineTo((333 * 3) / 4, 333 / 2);
    // taking a purple pen and coloring the line
    // context.strokeStyle = "purple";
    context.stroke();
    // context.fillStyle = color;
    // context.fill();
  }

  return null;
};
