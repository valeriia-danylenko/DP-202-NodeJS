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

function spinner (...args) {
  args[0].id = setInterval((a)=> {
    [obj, numRepeats, min, fn, circular] = a;
    if (circular) {
        if (obj.times == numRepeats) obj.times = min;
        obj.times++
    } else {
      if (obj.times ==  numRepeats) obj.reverse = true;
      else if (obj.times == min) obj.reverse = false;
      obj.reverse ? obj.times-- : obj.times++
    }
    console.clear()
    fn(obj, numRepeats, min);
  }, 300, args)
}

function horizontalBlocks (...args) {
  [obj] = args
  console.log(obj.char.repeat(obj.times))
}

function verticalBlocks (...args) {
  [obj, numRepeats] = args
  console.log(`\n`.repeat(numRepeats-obj.times),`\n${obj.char}`.repeat(obj.times))
}

function triangesSpin(...args) {
    [obj, numRepeats] = args;
    console.log(`${obj.char1.repeat(obj.times)}${obj.char2.repeat(numRepeats-obj.times)}`);
}

function squaresSpin(...args) {
    [obj] = args
    console.log(`${obj.char.repeat(obj.times)}`);
}

function equalSpin(...args) {
    [obj, numRepeats] = args
    console.log(`[ ${'  '.repeat(numRepeats-obj.times)}${obj.char.repeat(obj.times)} ]`)
}

function displayChars(...args){
    [obj] = args
    console.log(obj[`char${obj.times}`])
}

spinner (obj=blocks, numRepeats=5,  min=1, fn=horizontalBlocks, circular=false)
spinner (obj=blocks, numRepeats=5,  min=1, fn=verticalBlocks, circular=false)
spinner (obj=triangles, numRepeats=4,  min=0, fn=triangesSpin, circular=false)
spinner (obj=squares, numRepeats=5,  min=-1, fn=squaresSpin, circular=true)
spinner (obj=equal, numRepeats=5,  min=0, fn=equalSpin, circular=false)
spinner (obj=bigSquares, numRepeats=3,  min=0, fn=displayChars, circular=true)
spinner (obj=arrows, numRepeats=8,  min=0, fn=displayChars, circular=true)
