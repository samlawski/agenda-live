import React from "react"

import "./CurrentTime.css"

export default props => {
  return (
    <div className="CurrentTime">
      <div className="CurrentTime__inner">{props.currentTime.toLocaleTimeString()}</div>
    </div>
  )
}