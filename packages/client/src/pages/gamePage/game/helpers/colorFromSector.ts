export const colorFromSector = (color: string, sector = 9) => {
  return color.replace('X', sector.toString())
}
