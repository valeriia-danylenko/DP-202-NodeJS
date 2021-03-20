function binaryRepresentation(num) {
  if (num >= 0) {
    const binaryNumString = num.toString(2).toString()
    let countOne = 0;
    for (let i = 0; i < binaryNumString.length; i++) {
      if (binaryNumString[i] == '1') {
        countOne += 1
  }}
} else { throw "A number can't be negative" }
  return countOne
}

// console.log(binaryRepresentation(11))
