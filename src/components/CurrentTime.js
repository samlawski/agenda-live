import React, {
  useState,
  useEffect,
} from "react"

import "./CurrentTime.css"

export default props => {
  const [date, setDate] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(
      () => setDate(new Date()),
      1000
    )

    return () => clearInterval(timer)
  }, [date])

  return <div className="CurrentTime">{date.toLocaleTimeString()}</div>
}