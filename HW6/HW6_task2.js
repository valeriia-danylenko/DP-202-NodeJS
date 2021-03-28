String.prototype.isAlpha = function ( ) {
  return /[a-z]+/gi.test(this);
}

function isIn (char, array) {
  for (let el of array) {
    if (char === el) return true
  }
  return false
}

function replaceAll(text, chars, replacement) {
  const newText = [];
  let currentIndex = 0;
  for (let i = 0; i < text.length; i++) {
    if (isIn(text[i], chars)) {
      newText.push(text.slice(currentIndex, i));
      newText.push(replacement);
      currentIndex = i+1;
    }
  }
  if (currentIndex != text.length-1) {
    newText.push(text.slice(currentIndex, text.length))
  }
  return newText.join('')
}

function iHateLoops(sentenses) {
  const secret = [];
  let k = 0;
  while (k < sentenses.length) {
    sentenses[k].forEach(el => {
      if (k + 1 < sentenses.length) {
        secret.push(sentenses[k + 1][countWordLength(el)-1])
      }
      k++;
    })
  }
  return secret;
}

function countWordLength (word) {
  count = 0;
  for (let i = 0; i < word.length; i++) {
    word[i].isAlpha() && count++;
  }
return count
}

function decodeText(text) {
  const sentences = replaceAll(text, ['.', '!', '?'], '+').split(/[+][ ]?/)
  if (!sentences[sentences.length -1]) {sentences.length -= 1;}
  sentences.map((sentence, i, arr) => {
    return arr[i] = replaceAll(sentence, [',', ':', ';', '"'], '').split(' ');
  })
  const secretText = iHateLoops(sentences).join(' ')
  return secretText[0].toUpperCase() + secretText.slice(1).toLowerCase() + '.'
}


// const text = 'Yesterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse! The "mission" to try and seduce her was a complete failure last month! By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it. I wanted to feel done with it first.'
// console.log(decodeText(text))
