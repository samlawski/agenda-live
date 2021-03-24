import React from "react"
import {hot} from "react-hot-loader"

import "./App.css"
import CurrentTime from "./components/CurrentTime"

const App = props => (
  <div className="App">
    <CurrentTime />
  </div>
)

export default hot(module)(App)