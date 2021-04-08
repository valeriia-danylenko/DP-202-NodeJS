import { isNum } from './validator.js';

const failure = {
  status: 'failed'
}

function paramsValidation(args) {
  if (args.length !== 1) {
    failure.reason = 'Function takes only 1 parameter'
    return false;}
  args = args[0];
  if (typeof args !== 'object') {
    failure.reason = 'Parameter must be an object'
    return false;}
  if (args !== Object(args)) {
    failure.reason = 'Parameter must be an object'
    return false;}
  if (Array.isArray(args)) {
    failure.reason = 'Parameter must be an object'
      return false;}
  if (!isNum(args.min) || !isNum(args.max)) {
    failure.reason = 'Object must include keys min and max the value of which must be valid numbers'
    return false;}
  for (const [key, value] of Object.entries(args)) {
    if (key == 'min' || key == 'max') {
      if (value % 1 !== 0 || value < 0 || value > 999999) {
        failure.reason = 'Values must not be decimals. Values must be in range (0, 999999)'
        return false;}
    }
  }
  if (args.min >= args.max) {
    failure.reason = 'Min value cannot be greater than max'
    return false;}
  return true;
}

function counter(num1, num2) {
  const stats = {easyCount: 0, complexCount: 0};

  while (num1 <= num2) {
    let strNum1 = num1.toString();
    if (strNum1.length < 6) {
      strNum1 = `${'0'.repeat(6-strNum1.length)}${strNum1}`;
    }

    //version 1
    let sumThree1 = strNum1.slice(0, 3).split('').reduce((acc, el) => {
      acc += parseInt(el, 10);
      return acc;
    }, 0)
    let sumThree2 = strNum1.slice(3, ).split('').reduce((acc, el) => {
      acc += parseInt(el, 10);
      return acc;
    }, 0)
    sumThree1 == sumThree2 && stats.easyCount++;

    // version 2
    let [t1, t2] = ['', ''];
    for (let i = 0; i < 6; i++) {
      i%2 == 0 ? t2 += strNum1[i] : t1 +=strNum1[i]
    }
    let combin1 = t1.split('').reduce((acc, el) => {
      acc += parseInt(el, 10);
      return acc;
    }, 0)
    let combin2 = t2.split('').reduce((acc, el) => {
      acc += parseInt(el, 10);
      return acc;
    }, 0)
    combin1 == combin2 && stats.complexCount++;

    num1++;
  }

  stats.complexCount > stats.easyCount ? stats['winner'] = 'Complex' : stats['winner'] = 'Easy';
  return stats;
}

function luckyTicket(...args) {
  if (!paramsValidation(args)) return failure
  const context = args[0];
  return counter(context.min, context.max)
}

export const task5 = luckyTicket;
