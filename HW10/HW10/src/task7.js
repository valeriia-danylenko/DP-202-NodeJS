// import { isNum } from './validator.js';
const isNum = require('./validator.js');

const failure = {
  status: 'failed'
}

function paramsValidation(args) {
  if (args.length != 1) {
    failure.reason = 'Function takes one parameter';
    return false;
  };
  args = args[0];
  if (args !== Object(args)) {
    failure.reason = 'Parameter must be an object';
    return false;
  };
  console.log(Object.keys(args).includes('min') && (Object.keys(args).includes('max')))
  if (!(Object.keys(args).includes('min') && (Object.keys(args).includes('max') ))) {
    if (!Object.keys(args).includes('lenght')) {
    failure.reason = 'Object must have properties (min, max), or (length).';
    return false;}
  };
  for (const [key, value] of Object.entries(args)) {
    if (key === 'min' || key === 'max') {
      if (!isNum(value) || value < 1 || value > 1000000) {
        failure.reason = 'Properties (min, max) must be valid numbers in range (1, 1000000)';
        return false;
      }
      if (args.max < args.min) {
        failure.reason = 'Max value cannot be lower than min value';
        return false; }
      } else if (key == 'length') {
        if (!isNum(value) || value <= 0 || value % 1 !== 0 || value > 1000000) {
          failure.reason = 'Length cannot be decimal and less than or equal to 0';
          return false;
        }
      }
    }
      return true;
  }


function realFibbonachi(min, max, len) {
  const fibonacchi = [];
  let curr = 1;
  let next = 1;
  console.log(min, max)
  if (min && max) {
    console.log('here')
    curr >= min && curr <= max && fibonacchi.push(curr)
    while (next <= max) {
      [curr, next] = [next, next + curr];
      curr >= min && fibonacchi.push(curr)
    }
  } else if (len) {
    fibonacchi.push(curr);
    while (fibonacchi.length < len) {
      [curr, next] = [next, next + curr];
      fibonacchi.push(curr);
    }
  }
  return fibonacchi;
}

function showSequence(...args) {
  if (!paramsValidation(args)) return failure;
  const {
    min,
    max,
    length
  } = args[0];
  console.log(min, max, length)
  return realFibbonachi(min, max, length);
}

// console.log(showSequence({min: 1, max:5, length:6}))
// // console.log(showSequence({min:40, max:90}))
// console.log(showSequence({min: 1, max:2, length:8}))
module.exports = showSequence;
// export const task7 = showSequence;
// console.log(showSequence({min: 0.1, max: 0.5}))
