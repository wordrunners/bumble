export const HUDEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) => {
  context.fillStyle = 'rgba(222, 219, 0, 1)';
  context.fillRect(width*0.3, height*0.94, width*0.1, height);

  context.fillStyle = 'rgba(47, 179, 102, 1)';
  context.fillRect(width*0.45, height*0.94, width*0.1, height);

  context.fillStyle = 'rgba(237, 119, 159, 1)';
  context.fillRect(width*0.6, height*0.94, width*0.1, height);

  context.fillStyle = `rgba(20, 19, 13, 1)`;
  context.font = `bold ${height * 0.035}px PequenaPro`;
  context.textAlign = 'center'
  context?.fillText('+1', width*0.35, height*0.9775);
  context?.fillText('+2', width*0.5, height*0.9775);
  context?.fillText('+3', width*0.65, height*0.9775);
}
