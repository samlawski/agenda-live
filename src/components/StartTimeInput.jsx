import React from "react"
import "./StartTimeInput.css"

const StartTimeInput = props => {
  const regex24h = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
  const isStartTimePresentAndInvalid = props.startTime && !regex24h.test(props.startTime)
  const errorTimeInvalid = isStartTimePresentAndInvalid ? (
    <>
      <br />
      <small style={{color: "slateblue"}}>Please use the 24-hour time format HH:MM</small>
    </>
  ) : null
  
  return (
    <div className="StartTimeInput">
      <label htmlFor="startTimeInput">Start time: </label>
      <input 
        id="startTimeInput" 
        type="time" 
        placeholder="HH:MM"
        onChange={props.onChange}
        value={props.startTime}
      />
      {errorTimeInvalid}
    </div>
  )
}

export default StartTimeInput