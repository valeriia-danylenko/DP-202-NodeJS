function checkEquality (array) {
  if (array.every(el => el == 1)) return 1
  if (array.every(el => el == 2)) return 2
  if (array.some(el => el == 0)) return -1
  return 0
}


function checkState (matrix) {

  const moreArrays = {
    diagonal1: [],
    diagonal2: [],
    vert0: [],
    vert1: [],
    vert2: []
  }

  for (let i = 0; i < matrix.length; i++) {
    moreArrays.diagonal1.push(matrix[i][i]);
    moreArrays.diagonal2.push(matrix[i][matrix.length-1-i]);
    for (let j = 0; j < matrix.length; j++) {
        moreArrays['vert' + j].push(matrix[i][j]);
    }
  }

  matrix.push(Object.values(moreArrays));
  // console.log(matrix)

  for (const array of matrix) {
    const winner = checkEquality(array) > 0 && checkEquality(array);
    if (winner) return winner;
    const notFinished =  checkEquality(array) == -1 && checkEquality(array);
    if (notFinished) return notFinished;
      }
  return 0;
}

console.log(checkState([[2, 2, 2],[2, 1, 0],[2, 1, 2]]));
