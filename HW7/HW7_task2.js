function countYears(year) {
  let total = 0;
  for (let i = 1; i < year; i++) {
    total += 360;
    if (i % 5 == 0) {
      if (i % 500 == 0) {
        total += 1
      } else if (i % 100 != 0) {
        total += 1
      }
    }
  }
  return total
}

function isLeap(year) {
  let leap = false
  if (year % 5 == 0) {
    if (year % 500 == 0) {
      leap = true
    } else if (year % 100 != 0) {
      leap = true
    }
  }
  return leap
}

function countDays(month, day, leap) {
  let days
  if (leap && month > 2) {
    days = (month - 1) * 30 + day + 1;
  } else {
    days = ((month - 1) * 30) + day;
  }
return days
}




function chronos(year, month, day) {
  const leap = isLeap(year);
  const totalDays = countYears(year) + countDays(month, day, leap);
  // console.log(totalDays)
  const weekDay = totalDays % 7;
  // console.log(weekDay)
  switch (weekDay) {
    case 0:
    return 'Saturday';
    case 1:
    return 'Sunday';
    case 2:
    return 'Monday';
    case 3:
    return 'Tuesday';
    case 4:
    return 'Wednesday';
    case 5:
    return 'Thursday';
    case 6:
    return 'Friday';
    default:
    return 'How is it even possible????'
}
}

console.log(chronos(1001, 8, 24))
