function validation(arr, res) {
  if (arr.length < 2 || arr.length > 22) return false
  if (res < -10 || res > 10) return false
  for (let el of arr) {
    if (el < 0 || el > 10) {
      return false
    }
  }
  return true
}


function whyDoesItWork(arr, res) {
  if (!validation(arr, res)) return 'Nope'
  const sum = arr.reduce((acc, el) => acc + el);
  const diff = arr.reduce((acc, el) => acc - el);
  const hashArray = []
  for (let i = sum; i >= diff; i--) {
    if (i === diff) {
      hashArray.push({ num: i, val: 1 });
    } else {
      hashArray.push({ num: i, val: 0 });
    }
  }
  for (let i = 1; i < arr.length; i++) {
    const num = arr[i] * 2;

    hashArray.forEach(el => {
      if (el.val == 1) {
        const abracadabra = el.num + num;
        hashArray.forEach(e => {
          if (e.num)
            e.num == abracadabra ? e.val = 1 : null
        })
      }
    })
  }
  const resultArr = hashArray.reduce((acc, el) => {
    el.val == 1 && acc.push(el.num);
    return acc;
  }, [])
  return resultArr.includes(res)
}

// const arr = [1, 3, 4, 6, 8]
// // whyDoesItWork([5, 7, 8, 2], 2)
// console.log(whyDoesItWork(arr, -2))
