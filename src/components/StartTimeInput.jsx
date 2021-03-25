import React from "react"

export default props => {
  const regex24h = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
  const errorTimeInvalid = !props.startTime || regex24h.test(props.startTime) ? null : `Please use the 24-hour time format HH:MM`
  
  return (
    <>
      <label htmlFor="startTimeInput">Start time: </label>
      <input 
        id="startTimeInput" 
        type="time" 
        placeholder="HH:MM"
        onChange={props.onChange}
        value={props.startTime}
      />
      <br />
      <small style={{color: "lightgrey" }}>{errorTimeInvalid}</small>
    </>
  )
}