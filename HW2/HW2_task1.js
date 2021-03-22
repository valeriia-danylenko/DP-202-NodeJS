// concat(), lastIndexOf(), includes(), repeat(), substr(), substring()

////////////////////// concat()
function newConcat(str, ...args) {
  let newArr = [str];
  for (let i = 0; i < args.length; i++) {
    newArr.push(args[i])
  }
  return newArr.join('');
}

// console.log(newConcat('abc', 'def', 'gfh'))
// console.log(newConcat('abc', {a:'a'}, 5))

/////////////////////lastIndexOf()
function newLastINdexOf(str, search, index = str.length) {
  if (!(typeof index === "number")) {
    return 'Index must be an integer'
  } else if (index < 0) {
    index = 0
  } else if (index > str.length) {
    index = str.length
  }

  for (let i = index; i >= 0; i--) {
    if (str.slice(i, i + search.length) === search) {
      return i
    }
  }
  return -1
}

// console.log(newLastINdexOf('Hello', 'llo')) //2
// console.log(newLastINdexOf('morok', 'o')); //3
// console.log(newLastINdexOf('morok', 'o', 2)); //1
// console.log(newLastINdexOf('morok', 'o', 0)); //-1


/////////////////////// includes()
function newIncludes(str, search, index = 0) {
  for (let i = index; i < str.length; i++) {
    if (str.slice(i, i + search.length) === search) {
      return true
    }
  }
  return false
}

// console.log(newIncludes('Hello', 'el'));
// console.log(newIncludes('Hello', 'el', 2));

// /////////////////////repeat()
function newRepeat(str, count){
  let newStr = "";
  if (count < 0) {
    return 'Count cant be negative'
  } else if (count > 0) {
    for (let i=0; i<Math.floor(count); i++){
    newStr += str;
    }
  }
  return newStr;
}

// console.log(newRepeat('Hello', 3.6))
// console.log(newRepeat('Hello', -1))
// console.log(newRepeat('Hello', 0))

//////////////substr()
function newSubstr(str, start, length=false) {
  if (length!==false && length <= 0) {return '';}
  if (start < 0 && Math.abs(start) > str.length) {start = 0}
  let index;
  start >=0 ? index = start : index = str.length + start;
  if (length) {
    return str.slice(index, index+length)
  } else {
     return str.slice(index,)
  }
}

// console.log(newSubstr('Mozilla', 1, 0)); //""
// console.log(newSubstr('Mozilla', 1, 2)); //"oz"
// console.log(newSubstr('Mozilla', 2)); //"zilla"
// console.log(newSubstr('Mozilla', -3)); // жзи
// console.log(newSubstr('Mozilla', -20, 2)); //Mo
// console.log(newSubstr('Mozilla', 20, 2)); //''


// ////////////////substring()
function newSubstring(str, start, end=false) {
  if (end!==false && start == end) {return ''};
  if (end!==false && end < 0) {end = 0};
  if (start < 0) {start = 0};
  if (end!==false && end > str.length) {end = str.length};
  if (start > str.length) {start = str.length};
  if (end!==false && end < start) {let temp = start; start = end; end = temp}
  if (end!==false) {
    return str.slice(start, end)
  } else {
    return str.slice(start,)
}
}

// console.log(newSubstring('Mozilla', 3, 3)) //''
// console.log(newSubstring('Mozilla', 0, 3)) //'Moz'
// console.log(newSubstring('Mozilla', 3, 0)) //'Moz'
// console.log(newSubstring('Mozilla', 4, 7)) //'lla'
// console.log(newSubstring('Mozilla', 0, 6)) //'Mozill'
// console.log(newSubstring('Mozilla', -8, 6)) ///'Mozill'
// console.log(newSubstring('Mozilla', 0, 7)) // 'Mozilla'
// console.log(newSubstring('Mozilla', 0, 10)) // 'Mozilla'
// console.log(newSubstring('Mozilla', 5)) // 'la'
// console.log(newSubstring('Mozilla', 10)) // ''
