import React, {
  useState
} from "react"
import {hot} from "react-hot-loader"

import "./App.css"
import CurrentTime from "./components/CurrentTime"
import StartTimeInput from "./components/StartTimeInput"

const App = props => {
  const [state, setState] = useState(() => ({
    startTime: new Date().toTimeString().substring(0,5),
    items: [
      {
        id: "sd",
        durationInMinutes: 5,
        description: "Welcome"
      },
      {
        id: "kuu",
        durationInMinutes: 10,
        description: "☕️ Break"
      }
    ]
  }))

  const handleStartTimeInputChange = event => setState(state => ({...state, startTime: event.target.value }))


  const handleRemoveItem = removedItem => setState(state => ({
    ...state,
    items: state.items.filter(item => item.description !== removedItem.description)
  }))

  const handleDurationChange = changedItem => setState(state => ({
    ...state
  }))

  const handleDescriptionChange = changedItem => setState(state => ({
    ...state
  }))


  return (
    <div className="App">
      <CurrentTime />
  
      <StartTimeInput
        startTime={state.startTime}
        onChange={handleStartTimeInputChange} 
      />

      {state.items.map(item => (
        <li key={item.id}>
          <span>12:45</span>
          <input type="number" onChange={handleDurationChange} value={item.durationInMinutes} />
          <input type="text" onChange={handleDescriptionChange} value={item.description} />
          <button onClick={() => handleRemoveItem(item)}>x</button>
        </li>
      ))}

    </div>
  )
}

export default hot(module)(App)
