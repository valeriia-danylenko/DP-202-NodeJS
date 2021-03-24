function meeting(arrayOfRooms, need) {
  if (need == 0) {
    return 'Game On';
  }
  const resultArray = [];
  let chairsLetf = need;
  for (let i = 0; i < arrayOfRooms.length; i++) {

    const numPeople = arrayOfRooms[i][0].length;
    const numChairs = arrayOfRooms[i][1];
    const freeChairs = numChairs - numPeople;
    if (freeChairs < 0) {
      resultArray.push(0);
      continue;
    }
    chairsLetf -= freeChairs;
    if (chairsLetf > 0) {
        resultArray.push(freeChairs);
      } else if (chairsLetf <= 0) {
        resultArray.push(freeChairs + chairsLetf);
        return resultArray;
      }
    }
  }


// console.log(meeting([['XXX', 3], ['XXXXX', 6], ['XXXXXX', 9]], 4));
// console.log(meeting([['XXX', 1], ['XXXXXX', 6], ['X', 2], ['XXXXXX', 8], ['X', 3], ['XXX', 1]], 5));
// console.log(meeting([['XX', 2], ['XXXX', 6], ['XXXXX', 4]], 0) )
