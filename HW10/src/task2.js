const isNum = require('./validator.js');
// import { isNum } from './validator.js';
const calculateAllowedH = require('./calculations/calc.js')
// import { calculateAllowedH } from './calculations/calc.js';

const failure = {
  status: 'failed'
}

function paramValidation(args) {
  if (args.length !== 2) {
    failure.status = 'Function takes two parameters';
    return false;}
  for (let arg of args) {
    if (arg !== Object(arg)) {
      failure.status = 'Each parameter must be an object';
      return false;}
    for (let val of Object.values(arg)) {
      if (!isNum(val)) {
        failure.status = 'Values Must be valid numbers';
        return false;}
      if (val < 1 || val > 1000000) {
        failure.status = 'Value must be in range (1,1000000)';
        return false;}
      };
    };
    if ( !( (Object.keys(args[0]).includes('a', 'b') && Object.keys(args[1]).includes('c', 'd')) || (Object.keys(args[1]).includes('a', 'b') && Object.keys(args[0]).includes('c', 'd')) ) ) {
      failure.status = 'Objects must include keys (a,b) and (c,d)';
      return false;}
    return true
};


function changeSides(array) {
  if (array[0] < array[1]) {
    [array[0], array[1]] = [array[1], array[0]]
  };
  return array
};

function canFit(env1, env2) {
  let big, small;
  if (env1[0]*env1[1] > env2[0]*env2[1]) {
    [big, small] = [env1, env2];
  } else if (env1[0]*env1[1] < env2[0]*env2[1]) {
    [big, small] = [env2, env1];
  } else {
    if (env1[0] > env2[0]) {
      [big, small] = [env1, env2];
    } else if (env1[0] < env2[0]) {
      [big, small] = [env2, env1];
    } else {
      return false;
    };
  };
  if (big[0] > small[0] && big[1] > small[1]) return small;
  if (big[0] < small[0]) {
    result = calculateAllowedH(big, small)
    return result ? small : false};
  return false
};

function envelopes(...args) {
  if (!paramValidation(args)) return failure;
  const [envelope1, envelope2] = args;
  let env1, env2;
  if (Object.keys(envelope1).includes('a','b')) {
    env1 = changeSides([envelope1.a, envelope1.b]);
    env2 = changeSides([envelope2.c, envelope2.d]);
  } else {
    env1 = changeSides([envelope1.c, envelope1.d]);
    env2 = changeSides([envelope2.a, envelope2.b]);
  }
  result = canFit(env1, env2)
  return result ? (result === env1 ? 'envelope 1' : 'envelope 2') : 0
};

// export const task2 = envelopes;
module.exports = envelopes;
// area 1 > area 2. expected 0
// const env1 = {a: 60, b:12}
// const env2 = {c:18, d:15}
// area 2 > area 1, expect 1
// const env1 = {a: 10, b:5}
// const env2 = {c: 11, d:6}
// //area 1 == area 2 a < c, expect 0
// const env1 = {a: 40, b:20}
// const env2 = {c: 50, d:16}
// //area 1 == area 2 a > c, expect 0
// const env1 = {a: 50, b:16}
// const env2 = {c: 40, d:20}
// // 1 == 2 expect 0
// const env1 = {a:10, b: 8}
// const env2 = {c:10, d: 8}
//area 1 > area 2, expect 2
// const env1 = {a:20, b:40}
// const env2 = {c: 15, d: 30}
// //area 1 == area 2, a < c, expect 1
// const env1 = {a:30, b:15}
// const env2 = {c: 40, d: 20}
// // area1 == area2, expect 0
// const env1 = {a: 40, b:20}
// const env2 = {c: 50, d:16}
// // area1 > area2, c>a, expect 2
// const env1 = {a:20, b:11}
// const env2 = {c:21, d:2}
// // area2> area1, c<a, expect 1
// const env1 = {a:21, b:3}
// const env2 = {c:20, d:11}
//expect 2
// const env1 = {a:20, b:11}
// const env2 = {c:20.2, d:3.5}

// console.log(envelopes(env1, env2))
