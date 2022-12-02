export const SendEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
): void => {
  const radius = width < height*0.67 ? width*0.48 : height*0.325;

  context.font = `bold ${radius * 0.285}px PequenaPro`;
  context.textAlign = 'center'

  context.lineWidth = radius * 0.035;
  context.strokeStyle = `rgba(255, 229, 255, 255)`;
  context.strokeText('Bumble', width*0.5, height*0.875);
  context.fillStyle = `rgba(20, 29, 13, 1)`;
  context.fillText('Bumble', width*0.5, height*0.875);
}
