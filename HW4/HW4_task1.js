s="Fred:Corwill;Wilfred:Corwill;Barney:Tornbull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill"

function rearrangeList (list) {
  const arrayNames = list.split(';');
  const newString = [];
  for (let i = 0; i < arrayNames.length; i++) {
    arrayNames[i] = arrayNames[i].toUpperCase().split(':')
  }
  arrayNames.sort(function (a,b) {
    if (a[1] > b[1]) { return 1 }
    else if (a[1] < b[1]) { return -1 }
    else if (a[1] == b[1]) {
      if (a[0] > b[0]) { return 1 }
      else if (a[0] < b[0]) { return -1 }
      else { return 0 }
      }
  })
  arrayNames.forEach(el => {
    newString.push(`(${el[1]}, ${el[0]})`);
  })
  return newString.join(' ');
}

console.log(rearrangeList(s));
