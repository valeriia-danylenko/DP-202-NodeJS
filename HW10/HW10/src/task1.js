const isNum = require('./validator.js');
// import { isNum } from './validator.js';

const failure = {
  status: 'failed'
}

function paramsValidation(args) {
if (args.length != 3) {
  failure.reason = 'Function takes 3 parameters';
  return false;}
  for (let i = 0; i < args.length-1; i++){
    if (!isNum(args[i])) {
      failure.reason = 'First two parameters must be valid numbers';
      return false}
    if (args[i] % 1 !== 0) {
      failure.reason = 'First two parameters must not be decimals';
      return false};
    if (args[i] < 2 || args[i] > 256) {
      failure.reason = 'First two parameters must be in range (2, 256)';
      return false};
  }
  if (typeof args[args.length-1] !== 'string') {
    failure.reason = 'Third parameter must be in a string'
    return false};
  if (args[args.length-1].length === 0) {
    failure.reason = 'A length of a third parameter must not be zero'
    return false;}
  return true;
}

function chessBoard(...args) {
  if (!paramsValidation(args)) return failure;
  let [length, width, symbol] = args
  symbol = symbol[0];
  let row = ''
  for (let w = 0; w < width; w++){
    w % 2 !== 0 ? row+=symbol : row+=' '
  }
  const reversedRow = row.split('').reverse().join('');
  let board = ''
  for (let l = 1; l <= length; l++) {
    l % 2 == 0 ? board += row : board += reversedRow
    l !== length ? board += '\n': null
  }
  return board
}


// export const task1 = chessBoard;
module.exports = chessBoard;

