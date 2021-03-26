import React, {
  useState,
  useEffect
} from "react"
import {hot} from "react-hot-loader"
import moment from "moment"
import { ReactSortable } from "react-sortablejs"

import "./App.css"
import CurrentTime from "./components/CurrentTime"
import StartTimeInput from "./components/StartTimeInput"

import generateRandomId from "./services/generateRandomId"
import useKeyPressCtrlN from "./services/useKeyPressCtrlN"

const _addMinutesToTime = (timeAsString, minutes) => moment(timeAsString, "HH:mm").add(minutes, "minutes").format("HH:mm")

const App = props => {
  const [currentTime, setCurrentTime] = useState(() => new Date())
  const [startTime, setStartTime] = useState(() => new Date().toTimeString().substring(0,5))
  const [items, setItems] = useState(() => ([
    {
      id: "1",
      durationInMinutes: 5,
      description: "Welcome 👋"
    }
  ]))

  // HANDLERS

  const handleStartTimeInputChange = event => setStartTime(event.target.value)

  const handleAddItem = () => setItems([...items, {id: generateRandomId(), durationInMinutes: "", description: ""}])
  const handleRemoveItem = removedItem => setItems(items.filter(item => item.id !== removedItem.id))
  const handleDurationChange = (changedValue, changedItem) => setItems(
    items.map(item => {
      const isChangedItem = item.id == changedItem.id
      const isNoMoreThan4digits = changedValue.length <= 4
      if(isChangedItem && 
        isNoMoreThan4digits) item.durationInMinutes = changedValue
      return item
    })
  )
  const handleDescriptionChange = (changedValue, changedItem) => setItems(
    items.map(item => {
      if(item.id == changedItem.id) item.description = changedValue
      return item
    })
  )
  

  // EFFECTS

  // Current Time
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentTime(new Date()),
      1000
    )
    return () => clearInterval(timer)
  })

  // Listen to global short cut for creating empty item:
  useKeyPressCtrlN(handleAddItem)


  // VIEW METHODS

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

  // RENDER

  const itemElements = items.map(item => {
    const time = itemTime(item)
    const isItemTimeNow = moment().isBetween(moment(time, "HH:mm"), moment(time, "HH:mm").add(item.durationInMinutes, "minutes"))
    const currentItemClassName = isItemTimeNow ? "ItemRow--current" : null

    return (
      <li key={item.id} className={`ItemRow ${currentItemClassName}`}>
        <span className="ItemRow__handle">↕</span>
        <strong className="ItemRow__time">{time}</strong>
        <div className="ItemRow__input--duration">
          <input type="number" onChange={event => handleDurationChange(event.target.value, item)} value={item.durationInMinutes} placeholder="0" />
          '
        </div>
        <input 
          type="text"
          onChange={event => handleDescriptionChange(event.target.value, item)} 
          value={item.description} 
          placeholder="..." 
        />
        <button onClick={() => handleRemoveItem(item)}>🗑</button>
      </li>
    )
  })

  return (
    <div className="App">
      <CurrentTime currentTime={currentTime} />
  
      <StartTimeInput
        startTime={startTime}
        onChange={handleStartTimeInputChange} 
      />

      <ReactSortable list={items} setList={setItems} tag="ul" handle=".ItemRow__handle" className="ItemRows">
        {itemElements}
      </ReactSortable>

      <button className="ItemAdd" onClick={handleAddItem}>Add item <small>(Ctrl + N)</small></button>

      <footer>
        End time: {endTime()}
      </footer>

    </div>
  )
}

export default hot(module)(App)
