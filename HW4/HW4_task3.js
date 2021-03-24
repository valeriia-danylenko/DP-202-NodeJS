const planeArray = [
  [2,2], // A
  [2,8], // B
  [5,5], // C
  [6,3], // D
  [6,7], // E
  [7,4], // F
  [7,9]  // G
];

function findBiggestDiff (arr) {
  const numArray = []
  planeArray.forEach(el => {
    numArray.push(el[0], el[1])
  })
  return 2 * (Math.max(...numArray) - 1);
}

function closestPosition(arr) {
  const bigDiff = findBiggestDiff (arr);
  elDiff = {sumDiff: bigDiff, coords: []};
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i == j) {
        continue;
      } else {
        // console.log(`checking ${arr[i]} and ${arr[j]}`)
        const lengthDiff = Math.abs(arr[i][0] - arr[j][0]);
        const widthDiff = Math.abs(arr[i][1] - arr[j][1]);
        const sumDiff = lengthDiff + widthDiff;
        // console.log(`sum difference is ${sumDiff}. Current elDiff.sumDiff ${elDiff.sumDiff}`)
        if (sumDiff < elDiff.sumDiff) {
          elDiff.sumDiff = sumDiff;
          elDiff.coords[0] = arr[i];
          elDiff.coords[1] = arr[j];
        }
      }
    }
  }
  return elDiff.coords;
}

console.log(closestPosition(planeArray));
