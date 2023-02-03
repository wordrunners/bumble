type ExitFullscreen = typeof document.exitFullscreen
type RequestFullscreen = typeof document.documentElement.requestFullscreen
type fullscreenElement = typeof document.fullscreenElement

declare global {
  interface Document {
    webkitExitFullscreen: ExitFullscreen
    mozCancelFullScreen: ExitFullscreen
    msExitFullscreen: ExitFullscreen
  }

  interface Document {
    webkitFullscreenElement: fullscreenElement
    mozFullScreenElement: fullscreenElement
    msFullscreenElement: fullscreenElement
  }

  interface HTMLElement {
    webkitRequestFullscreen: RequestFullscreen
    mozRequestFullScreen: RequestFullscreen
    msRequestFullscreen: RequestFullscreen
  }
}

export const toggleFullscreen = () => {
  const elem = document.documentElement
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen((<any>Element).ALLOW_KEYBOARD_INPUT)
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
}
