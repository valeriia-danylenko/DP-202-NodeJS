const newMap = ['Яблоко', 'Банан', 'Ананас'].reduce((acc, el) => {
  acc.push(el[0])
  return acc
}, [])
// console.log(newMap)


const newFilter = ['Яблоко', 'Банан', 'Ананас'].reduce((acc, el) => {
  el[0].toLowerCase() == 'а' && acc.push(el)
  return acc
}, [])
// console.log(newFilter)

const newForEach = ['Яблоко', 'Банан', 'Ананас'].reduce((acc, el, i) => {
  acc.push(`${i+1}: ${el}`);
  return acc
}, [])
// console.log(newForEach)
