export const correctPixels = (pixels: Uint8ClampedArray) => {
  let i = 1
  const buttons: Array<{value: number; count: number}> = []
  const sectors: Array<{value: number; count: number}> = []
  while (i < pixels.length) {
    const colorInfo = `${pixels[i]}`
    const button = +colorInfo.slice(colorInfo.length-2, colorInfo.length)

    const sector = +colorInfo.slice(colorInfo.length-1)

    if (buttons.length !== 0) {
      let added = false
      for (let j = 0; j < buttons.length; j++) {
        if (buttons[j].value === button) {
          buttons[j].count += 1
          added = true
        }
      }
      if (!added) {
        buttons.push({value: button, count: 1})
      }
    } else {
      buttons.push({value: button, count: 1})
    }

    if (sectors.length !== 0) {
      let added = false
      for (let j = 0; j < sectors.length; j++) {
        if (sectors[j].value === sector) {
          sectors[j].count += 1
          added = true
        }
      }
      if (!added) {
        sectors.push({value: sector, count: 1})
      }
    } else {
      sectors.push({value: sector, count: 1})
    }
    i += 4
  }

  let sector = -1
  let button = -1
  let counter = 0
  buttons.map(btn => {
    if (btn.count > counter) {
      button = btn.value
      counter = btn.count
    }
  })

  counter = 0
  sectors.map(sct => {
    if (sct.count > counter) {
      sector = sct.value
      counter = sct.count
    }
  })

  return { sector, button } 
}
