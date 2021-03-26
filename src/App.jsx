import React, {
  useState
} from "react"
import {hot} from "react-hot-loader"
import moment from "moment"
import { ReactSortable } from "react-sortablejs"

import "./App.css"
import CurrentTime from "./components/CurrentTime"
import StartTimeInput from "./components/StartTimeInput"

import generateRandomId from "./services/generateRandomId"

const _addMinutesToTime = (timeAsString, minutes) => moment(timeAsString, "HH:mm").add(minutes, "minutes").format("HH:mm")

const App = props => {
  const [startTime, setStartTime] = useState(() => new Date().toTimeString().substring(0,5))
  const [items, setItems] = useState(() => ([
    {
      id: "1",
      durationInMinutes: 5,
      description: "Welcome"
    }
  ]))


  const handleStartTimeInputChange = event => setStartTime(event.target.value)

  const handleAddItem = () => setItems([...items, {id: generateRandomId(), durationInMinutes: "", description: ""}])
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


  const itemTime = currentItem => {
    const currentItemIndex = items.findIndex(item => item.id == currentItem.id)
    const itemsUpToTheCurrent = items.slice(0, currentItemIndex)
    const sumOfMinutes = itemsUpToTheCurrent.reduce((currentSum, item) => currentSum + parseInt(item.durationInMinutes || 0), 0)

    return _addMinutesToTime(startTime, sumOfMinutes)
  }
  const endTime = () => _addMinutesToTime(
    startTime,
    items.reduce((currentSum, item) => currentSum + parseInt(item.durationInMinutes || 0), 0)
  )


  return (
    <div className="App">
      <CurrentTime />
  
      <StartTimeInput
        startTime={startTime}
        onChange={handleStartTimeInputChange} 
      />

      <ReactSortable list={items} setList={setItems} handle=".Item__handle">
        {items.map(item => (
          <li key={item.id}>
            <span className="Item__handle">:: </span>
            <span>{itemTime(item)}</span>
            <input type="number" onChange={event => handleDurationChange(event.target.value, item)} value={item.durationInMinutes} />
            <input type="text" onChange={event => handleDescriptionChange(event.target.value, item)} value={item.description} />
            <button onClick={() => handleRemoveItem(item)}>x</button>
          </li>
        ))}
      </ReactSortable>

      <button onClick={handleAddItem}>add item</button>

      <div>
        End time: {endTime()}
      </div>

    </div>
  )
}

export default hot(module)(App)
