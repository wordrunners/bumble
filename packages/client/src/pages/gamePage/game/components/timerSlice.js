let { createStore, applyMiddleware } = '@reduxjs/toolkit'

let initialState = {
  time: 0,
  start: 0,
  running: false
}

let START = 'timer/START'
let STOP = 'timer/STOP'
let RESET = 'timer/RESET'
let TIME = 'timer/TIME'

// This is the redux reducer function
function timer(state = initialState, action) {
  switch(action.type) {
    case START: 
      return {
        running: true, 
        time: action.time,
        start: action.time
      }
    case STOP:
      return Object.assign({}, state, {
        time: action.time,
        running: false
      })
    case RESET:
      return initialState
    case TIME:
      return Object.assign({}, state, {
        time: action.time
      })      
    default:
      return state
  }
}

// this is p much the same as redux-thunk
// allows you to dispatch functions instead of action objects
// and so one action can dispatch several async actions 
// until a certain condition is met
function thunk({ dispatch, getState }) {
  return (next) => (action) => {
    if(typeof action === 'function') {
      return action(dispatch, getState)
    }
    
    return next(action)
  }
}

let store = createStore(timer, applyMiddleware(thunk))
console.log(store.getState())

// Redux Actions
let start = () => {
  return {
    type: START,
    time: performance.now()
  }
}

let time = () => {
  return {
    type: TIME,
    time: performance.now()
  }
}

let reset = () => {
  return {
    type: RESET
  }
}

let stop = () => {
  return {
    type: STOP,
    time: performance.now()
  }
}

// This is our timer action
// it dispatches 'time' actions
// until we arent in a running state any more
let INTERVAL = 50
let runTimer = () => {
  return (dispatch, getState) => {
    dispatch(start())
    let timer = () => {
      if (getState().running) {
        dispatch(time())
        setTimeout(timer, INTERVAL)
      }
    }
    timer()
  }
}

// Log all state changes
store.subscribe(() => {
  console.log(store.getState())
})
// Start the watch!
store.dispatch(runTimer())

// Stop after a while
setTimeout(() => {
  store.dispatch(stop())
}, 5000)
