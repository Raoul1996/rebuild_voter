export default (timestamp) => {
  let nowTime = new Date()
  let endTime = new Date(timestamp)

  let t = endTime.getTime() - nowTime.getTime()
  let d = Math.floor(t / 1000 / 60 / 60 / 24)
  let hour = Math.floor(t / 1000 / 60 / 60 % 24)
  let min = Math.floor(t / 1000 / 60 % 60)
  let sec = Math.floor(t / 1000 % 60)

  if (hour < 10) {
    hour = '0' + hour
  }
  if (min < 10) {
    min = '0' + min
  }
  if (sec < 10) {
    sec = '0' + sec
  }
  let RestTime = d+'天'+hour + ':' + min + ':' + sec
  return RestTime
}