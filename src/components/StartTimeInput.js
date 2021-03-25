import React, {
  useState,
} from "react"

export default props => {
  const [time, setTime] = useState(new Date().toTimeString().substring(0,5))

  const regex24h = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
  const errorTimeInvalid = !time || regex24h.test(time) ? null : `Please use the 24-hour time format HH:MM`

  const handleInputChange = event => {
    setTime(event.target.value)
  }
  
  return (
    <>
      <label htmlFor="startTimeInput">Start time: </label>
      <input onChange={handleInputChange} value={time} id="startTimeInput" type="time" placeholder="HH:MM"></input>
      <br />
      <small style={{color: "lightgrey" }}>{errorTimeInvalid}</small>
    </>
  )
}