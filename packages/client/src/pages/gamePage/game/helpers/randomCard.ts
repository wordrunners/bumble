import { Card } from '@/types'

export const randomCard = (characters: string) => {
  const card: Card = []
  
  let set = 0
  let setOne = 0
  let setTwo = 0
  let setThree = 0

  let points = 0
  let point = 0
  let doubles = ''
  while (points < 3) {
    const index = Math.floor(Math.random() * 9)
    doubles += index
    if (doubles.includes(index.toString())) {
      points += 1
    }
  }

  for (let j = 0; j < 9; j++) {
    doubles.includes(j.toString()) ? point = 2 : point = 1

    while ((set === 0) && (setOne+setTwo+setThree !== 9)) {
      set = 1 + Math.floor(Math.random() * 3)
      if (set === 1) {
        (setOne < 3) ? setOne += 1 : set = 0
      } else if (set === 2) {
        (setTwo < 3) ? setTwo += 1 : set = 0
      } else if (set === 3) {
        (setThree < 3) ? setThree += 1 : set = 0
      }              
    }

    const index = Math.floor(Math.random() * (characters.length-1))

    card.push({
      letter: `${characters[index]}`,
      set: set,
      point: point
    })  

    set = 0
    point = 0
  }

  return card
}
