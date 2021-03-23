// pop, push, shift, unshift, concat

function newPop(arr) {
  const lastEl = arr[arr.length-1]
  arr.length -=1
  return lastEl
}

// const arr = [1,2,3,4,5];
// console.log(newPop(arr))
// console.log(arr)

function newPush(arr, ...el) {
for (let i = 0; i < el.length; i++) {
    arr[arr.length] = el[i]
  }
}

// const arr = [1,2,3,4,5];
// newPush(arr, 6, 7);
// console.log(arr)

function newShift(arr) {
  const firstEl = arr[0];
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] = arr [i + 1];
  }
  arr.length -= 1;
  return firstEl
}

// const arr = [1,2,3,4,5];
// console.log(newShift(arr));
// console.log(arr)
// console.log(arr.length)

function newUnshift(arr, ...el) {
  newLength = arr.length + el.length;
  oldArrayLength = arr.length;
  for (let i = newLength - 1; i >= el.length; i--) {
    oldArrayLength--;
    arr[i] = arr[oldArrayLength];
  }
  for (let i = 0; i < el.length; i++) {
    arr[i] = el[i];
  }
  return arr.length;
}

// const arr1 = [1,2,3,4,5]
// console.log(newUnshift(arr1, 6, 7, 8))
// console.log(arr1)

function newConcat(arr, ...args) {
  const newArr = arr;
  args.forEach(arg => {
    if (Array.isArray(arg)) {
      for (let i = 0; i < arg.length; i++) {
          newArr[newArr.length] = arg[i]
        }
    } else {
      newArr[newArr.length] = arg;
    }
  })
  return newArr
}

// const array1 = ['a', 'b', 'c'];
// const array2 = ['d', 'e', 'f'];
// const array3 = ['g', 'h', 'm']
// const a = 'a'
// const array4 = array1.concat(array2, array3, a );
// console.log(array4);
// console.log(newConcat(array1, array2, array3, a));
