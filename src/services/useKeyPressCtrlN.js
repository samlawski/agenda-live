import {
  useEffect
} from "react"

const useKeyPressCtrlN = callback => {
  const keyDownHandler = ({ key, ctrlKey}) => {
    if(ctrlKey && key === "n") callback()
  }

  return useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  })
}
export default useKeyPressCtrlN