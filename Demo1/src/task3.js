
import { isNum } from './validator.js';

const failure = {
  status: 'failed',
}

function paramsValidation(args) {
  if (args.length != 1) {
    failure.reason = 'Function takes only one parameter'
      return false};
  args = args[0]
  if (!(Array.isArray(args))) {
    failure.reason = 'Parameter must be an array'
    return false};
  for (let arg of args) {
    if (typeof arg !== 'object') {
      failure.reason = 'Each element of an array must be an object'
      return false;}
    if (Array.isArray(arg)) {
        failure.reason = 'Each element of an array must be an object'
        return false;}
    if (!(arg === Object(arg))) {
      failure.reason = 'Each element of an array must be an object'
      return false;}
    if (typeof arg.vertices !== 'string') {
      failure.reason = 'Each triangle object must include key verticles'
      return false;}
    if (!arg.vertices.match(/^([A-Z]{3})$/)) {
      failure.reason = 'Vericles must include 3 capital letters'
      return false;}
    const [s1, s2, s3] = arg.vertices.toLowerCase().split('');
    if (s1 === s2 || s2 === s3 || s3 === s1) {
      failure.reason = 'Verticles must consist on unique letters'
      return false;
    }
    const sides = [arg[s1], arg[s2], arg[s3]];
    for (let side of sides) {
      if (!isNum(side) || side <= 0) {
        failure.reason = 'Value of sides must correspond to lowercase Verticle name and be a valid number greater than 0'
        return false;}
    }
    if (!(sides[0] + sides[1] > sides[2] && sides[1] + sides[2] > sides[0] && sides[2] + sides[0] > sides[1])) {
      failure.reason  = 'Sides must form a valid triagle';
      return false
    }
  }
  return true;
}

// function checkName(name) {
//   if (!name) return false;
//   if (typeof name != 'string') return false;
//   if (!name.match(/^([A-Z]{3})$/)) return false;
//   return true
// }
//
// function checkValues(...args){
//   for (let arg of args) {
//     if (!arg || (!isNum(arg)) || arg <= 0) return false
//   } return true
// }

function chooseObjectProperties(objectArray) {
  const renamedTriangles = [];
  objectArray.forEach(object => {
      const sideNames = object.vertices.toLowerCase().split('');
      const [s1, s2, s3] = sideNames;
      // const [side1, side2, side3] = [object[s1], object[s2], object[s3]]
      const newObj = {}
      newObj['vertices'] = object.vertices;
      [newObj.s1, newObj.s2, newObj.s3] = [object[s1], object[s2], object[s3]]
      renamedTriangles.push(newObj)
        // }
      // }
    // }
  })
  return renamedTriangles
}

function sortTriangles(...args) {
  if (!paramsValidation(args)) return failure;
  const renamedTriangles = chooseObjectProperties(args[0])

  renamedTriangles.forEach(el => {
    const p = (el.s1+el.s2+el.s3)/2;
    const area = Math.sqrt(p*(p-el.s1)*(p-el.s2)*(p-el.s3))
    el.area = area;
  })

renamedTriangles.sort((a,b) => {
    if (a.area > b.area) return 1;
    if (a.area < b.area) return -1;
    return 0
  }).reverse();

  const sortedNames = renamedTriangles.reduce((acc, el) => {
    acc.push(el.vertices)
    return acc
  }, [])

  return sortedNames
}


export const task3 = sortTriangles;
