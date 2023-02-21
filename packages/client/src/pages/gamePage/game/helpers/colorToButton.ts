export const colorToButton = (color: string, button: number) => {
  const placeX = color.indexOf('X')
  return color.replace(color.slice(placeX-1, placeX+1), button.toString())
}
