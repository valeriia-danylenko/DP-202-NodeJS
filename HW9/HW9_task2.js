function countdown(num){
  const totalSeconds = Math.abs(num / 1000);
  const hours = Math.floor( totalSeconds / 3600);
  const secondsLeft = (totalSeconds % 3600);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = (secondsLeft % 60);
  const timeArray = [hours, minutes, seconds]

  let displayString = '';
  num < 0 ? displayString += '-' : displayString += '+'
  timeArray.forEach((time, i) => {
    const strTime = time.toString();
    strTime.length === 1 ? displayString += `0${strTime}`: displayString += strTime;
    i !== timeArray.length-1 ? displayString += ':' : null
  })
  return displayString
}

// console.log(countdown(155663000));
// console.log(countdown(-154800000));
// console.log(countdown(0))
// console.log(countdown(61000))
// console.log(countdown(360000000))
