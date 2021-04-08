import { isNum } from './validator.js';
import { calculateAllowedH } from './calculations/calc.js';

const failure = {
  status: 'failed'
}

function paramValidation(args) {
  if (args.length !== 2) {
    failure.reason = 'Function takes two parameters';
    return false;}
  for (let arg of args) {
    if (typeof arg !== 'object') {
      failure.reason = 'Each parameter must be an object'
      return false;}
    if (Array.isArray(arg)) {
        failure.reason = 'Each parameter must be an object'
        return false;}
    if (arg !== Object(arg)) {
      failure.reason = 'Each parameter must be an object';
      return false;}
    for (let val of Object.values(arg)) {
      if (!isNum(val)) {
        failure.reason = 'Values Must be valid numbers';
        return false;}
      if (val < 1 || val > 1000000) {
        failure.reason = 'Value must be in range (1,1000000)';
        return false;}
      };
    };
    if ( !( (Object.keys(args[0]).includes('a') &&
             Object.keys(args[0]).includes('b')
          && Object.keys(args[1]).includes('c') &&
             Object.keys(args[1]).includes('d')) ||
             (Object.keys(args[1]).includes('a') &&
              Object.keys(args[1]).includes('b')
           && Object.keys(args[0]).includes('c') &&
              Object.keys(args[0]).includes('d'))) ) {
    failure.reason = 'Objects must include keys (a,b) and (c,d)';
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
  if (big[0] < small[0] ) {
    const result = calculateAllowedH(big, small)
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
  const result = canFit(env1, env2)
  return result ? (result === env1 ? 'envelope 1' : 'envelope 2') : 0
};

export const task2 = envelopes;
