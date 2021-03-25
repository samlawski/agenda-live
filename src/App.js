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
        durationInMinutes: 5,
        description: "Welcome"
      }
    ]
  }))

  const handleStartTimeInputChange = event => setState(state => ({...state, startTime: event.target.value }))

  return (
    <div className="App">
      <CurrentTime />
  
      <StartTimeInput
        startTime={state.startTime}
        onChange={handleStartTimeInputChange} 
      />

    </div>
  )
}

export default hot(module)(App)

/* <ItemRow>
  <ItemReorderHandle />
  <ItemTime />
  <ItemDurationInput />
  <ItemDescriptionInput />
  <ItemDeleteBtn />
</ItemRow> */