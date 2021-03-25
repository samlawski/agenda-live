import React, {
  useState
} from "react"
import {hot} from "react-hot-loader"

import "./App.css"
import CurrentTime from "./components/CurrentTime"
import StartTimeInput from "./components/StartTimeInput"

const App = props => {
  const [startTime, setStartTime] = useState(() => new Date().toTimeString().substring(0,5))
  const [items, setItems] = useState(() => ([
    {
      id: "sd",
      durationInMinutes: 5,
      description: "Welcome"
    },
    {
      id: "kuu",
      durationInMinutes: 10,
      description: "☕️ Break"
    },
    {
      id: "123",
      durationInMinutes: 15,
      description: "Ending"
    }
  ]))


  const handleStartTimeInputChange = event => setStartTime(event.target.value)

  const handleRemoveItem = removedItem => setItems(items.filter(item => item.id !== removedItem.id))
  const handleDurationChange = (changedValue, changedItem) => setItems(
    items.map(item => {
      if(item.id == changedItem.id) item.durationInMinutes = changedValue
      return item
    })
  )
  const handleDescriptionChange = (changedValue, changedItem) => setItems(
    items.map(item => {
      if(item.id == changedItem.id) item.description = changedValue
      return item
    })
  )


  return (
    <div className="App">
      <CurrentTime />
  
      <StartTimeInput
        startTime={startTime}
        onChange={handleStartTimeInputChange} 
      />

      {items.map(item => (
        <li key={item.id}>
          <span>12:45</span>
          <input type="number" onChange={event => handleDurationChange(event.target.value, item)} value={item.durationInMinutes} />
          <input type="text" onChange={event => handleDescriptionChange(event.target.value, item)} value={item.description} />
          <button onClick={() => handleRemoveItem(item)}>x</button>
        </li>
      ))}

    </div>
  )
}

export default hot(module)(App)
