import React from "react"

import "./CurrentTime.css"

export default props => {
  const currentHour = parseInt(props.currentTime.toLocaleTimeString([], { hour: "2-digit", hour12: true}).split(" ")[0])
  const clockEmoji = [
    "🕛", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛"
  ][currentHour]

  return (
    <div className="CurrentTime">
      <div className="CurrentTime__inner">{clockEmoji} {props.currentTime.toLocaleTimeString()}</div>
    </div>
  )
}