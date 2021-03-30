const blocks = {
  id: 1,
  char: '█',
  times: 0,
  reverse: false
}

const triangles = {
  id: 1,
  char1: '▶',
  char2: '▷',
  times: 0,
  reverse: false
}

const squares = {
  id: 1,
  char: '■  ',
  times: 0,
  reverse: false
}

const equal = {
  id: 1,
  char: '= ',
  times: 0,
  reverse: false
}

const bigSquares = {
  id: 1,
  char1: '•',
  char2: '●',
  char3: '☻',
  times: 0,
}

const arrows = {
  id: 1,
  char1: '🡡',
  char2: '🡥',
  char3: '🡢',
  char4: '🡦',
  char5: '🡣',
  char6: '🡧',
  char7: '🡠',
  char8: '🡤',
  times: 0,
}


//unsuccessful attempt to creat a decorator :( python version
// function decorator(obj) {
//   function inner(fn) {
//     function wrapper(...args) {
//       let [numRepeats, min] = args
//       obj.id = setInterval((numRepeats, min) => {
//       if (obj.times == numRepeats) {
//         obj.reverse = true;
//       } else if (obj.times == min) {
//         obj.reverse = false
//       }
//       obj.reverse ? obj.times-- : obj.times++
//       fn(obj);
//AAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//     }, 300, obj)
//     }
//   }
// }
//
// @decorator
// function horizontalBlocks (obj) {
//   console.clear();
//   console.log(obj.char.repeat(obj.times))
// }


//1
blocks.id = setInterval((obj)=> {
  if (obj.times == 5) {obj.reverse = true;}
  else if (obj.times == 1) {obj.reverse = false }
obj.reverse ? obj.times-- : obj.times++
  console.clear();
  console.log(obj.char.repeat(obj.times))
}, 300, blocks)

//2
blocks.id = setInterval((obj)=> {
  if (obj.times == 5) {obj.reverse = true;}
  else if (obj.times == 1) {obj.reverse = false;}
obj.reverse ? obj.times-- : obj.times++
  console.clear();
  console.log(`\n`.repeat(5-obj.times),`\n${obj.char}`.repeat(obj.times))
}, 300, blocks)

//3
triangles.id = setInterval((obj)=> {
  if (obj.times == 4) {obj.reverse = true;}
  else if (obj.times == 0) {obj.reverse = false;}
  obj.reverse ? obj.times-- : obj.times++
  console.clear();
  console.log(`${obj.char1.repeat(obj.times)}${obj.char2.repeat(4-obj.times)}`)
}, 300, triangles)

// 4
squares.id = setInterval((obj)=> {
  if (obj.times == 5) {obj.times = 0;}
  console.clear();
  console.log(`${obj.char.repeat(obj.times)}`)
  obj.times++
}, 300, squares)

// 5
equal.id = setInterval((obj)=> {
  if (obj.times == 5) { obj.reverse = true;}
  else if (obj.times == 0) {obj.reverse = false;}
  obj.reverse ? obj.times-- : obj.times++
  console.clear();
  console.log(`[ ${'  '.repeat(5-obj.times)}${obj.char.repeat(obj.times)} ]`)
}, 300, equal)

// 6
bigSquares.id = setInterval((obj)=> {
  if (obj.times == 3) {obj.times = 0}
  obj.times++
  console.clear();
  console.log(obj[`char${obj.times}`])
}, 300, bigSquares)

// 7
arrows.id = setInterval((obj)=> {
  if (obj.times == 8) {obj.times = 0}
  obj.times++
  console.clear();
  console.log(obj[`char${obj.times}`])
}, 300, arrows)
