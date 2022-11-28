import Canvas from './components/canvas'
// import { AppContext } from './AppContext'

function App() {
  // const appData = {
  //   avatar: 'https://upload.wikimedia.org/wikipedia/commons/1/18/React_Native_Logo.png',
  //   word: ''
  // };
  return (
    <div className="App">
      {/* <AppContext.Provider value={appData}> */}
        <Canvas />
      {/* </AppContext.Provider> */}
    </div>
  )
}

export default App
