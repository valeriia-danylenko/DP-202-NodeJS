function sortString(str) {
  const wordsArray = str.split(' ')
  const sortedArray = []
  let insertIndex

  wordsArray.forEach(word => {
    for (let i = 0; i < word.length; i++) {
      try {
        insertIndex = Number(word[i]) - 1
      } finally {
        sortedArray[insertIndex] = word
      }
    }
  })
  return sortedArray.join(' ')
}


// console.log(sortString('4of Fo1r pe6ople g3ood th5e the2'))
