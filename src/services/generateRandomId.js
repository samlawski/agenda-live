export const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000).toString(36) +
        (new Date().getTime()).toString(36) + 
        new Date().getUTCMilliseconds()
}
export default generateRandomId