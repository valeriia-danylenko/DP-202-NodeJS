import { isNum } from './validator.js';

const failure = {
  status: 'failed'
}

function validation(args) {
  if (args.length !== 2){
    failure.reason = 'Function takes two parameters';
    return false;};
  for (let arg of args) {
    if (!isNum(arg)) {
      failure.reason = 'Both parameters must be valid numbers';
      return false;};
    if (arg < 1 || arg > 1000000) {
      failure.reason = 'Parameters must be in range from 1 to 1000000';
      return false;};
  }
  if (args[0] % 1 !== 0)  {
    failure.reason = 'Length cannot be a decimal';
    return false};
  return true;
}

function getSequence(...args) {
  if (!validation(args)) return failure;
  const [len, minSq] = args;
  let first = Math.ceil(Math.sqrt(minSq))
  const sequence = [];
  sequence.push(first);
  for (let i = 1; i < len; i++){
    first++;
    sequence.push(first);
  }
  return sequence.join(', ')
}


export const task6 = getSequence;
