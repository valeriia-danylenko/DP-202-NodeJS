const teamA = {
  activePlayers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  yellowCardPlayers : [],
  redCardPlayers: []
}

const teamB = {
  activePlayers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  yellowCardPlayers : [],
}

function excludePlayer(players, player) {
  for (let i=0; i<players.length; i++) {
    if (players[i] === player) {
      players.splice(i, 1);
    }}}

function parseCard(cardString) {
  const card = {}
  card.team = cardString[0]
  card.cardType = cardString[cardString.length-1]
  if (cardString.length === 3) {
    card.player = Number(cardString[1])
  } else {
    card.player = Number(cardString.slice(1,3))
  }
  return card
}

function reorginiseTeam(team, card) {
  if (card.cardType === 'R') {
      excludePlayer(team.activePlayers, card.player)
      }
  else if (card.cardType === 'Y') {
    if (team.yellowCardPlayers.includes(card.player)) {
      excludePlayer(team.activePlayers, card.player)
      excludePlayer(team.yellowCardPlayers, card.player)
    } else {
      team.yellowCardPlayers.push(card.player)
  }}}


function manStillStand(cardArray) {
  if (cardArray) {
  cardArray.forEach(cardString => {
    card = parseCard(cardString)
    if (card.team === 'A') {
      reorginiseTeam(teamA, card)
    } else if (card.team === 'B') {
      reorginiseTeam(teamB, card)
    }
  })}
  return [teamA.activePlayers.length, teamB.activePlayers.length]
}

// console.log(manStillStand(['A4R', 'A6R', 'A8R', 'A10R', 'A11R' ]))
