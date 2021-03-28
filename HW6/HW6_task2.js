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
  while (k < sentenses.length - 2) {
    sentenses[k].forEach(el => {
      k++;
      secret.push(sentenses[k][countWordLength(el)-1])
    })
    k++;
    secret.push('.')
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
  if (!text) return ''
  const sentences = replaceAll(text, ['.', '!', '?'], '+').replace(/[+]$/, '').split('+ ')
  sentences.map((sentence, i, arr) => {
    return arr[i] = replaceAll(sentence, [',', ':', ';', '"'], '').split(' ');
  })
  const secretText = iHateLoops(sentences).join(' ').split(' . ')
  secretText.map((sen, i, arr) => {
    arr[i] = (sen[0].toUpperCase() + sen.slice(1).toLowerCase()).replace(/[ .]{1,}$/, '') + '.'})
  return secretText.join(' ')
}


const text = 'Yesterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse! The "mission" to try and seduce her was a complete failure last month! By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it. I wanted to feel done with it first. Yesterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse! The "mission" to try and seduce her was a complete failure last month! By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it. I wanted to feel done with it first.'
console.log(decodeText(text))
