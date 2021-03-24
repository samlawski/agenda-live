import React from "react"
import {hot} from "react-hot-loader"

import "./App.css"
import CurrentTime from "./components/CurrentTime"
import StartTimeInput from "./components/StartTimeInput"

const App = props => (
  <div className="App">
    <CurrentTime />

    <StartTimeInput />

    {/* <ItemRow>
      <ItemReorderHandle />
      <ItemTime />
      <ItemDurationInput />
      <ItemDescriptionInput />
      <ItemDeleteBtn />
    </ItemRow> */}
  </div>
)

export default hot(module)(App)