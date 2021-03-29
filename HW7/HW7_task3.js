function damagedOrSunk(board, attacks) {

  info = {
    points: 0,
    sunk: 0,
    damaged: 0,
    notTouched: 0
  };

  boats = {};
  hits = {};

  const expandedBoard = [].concat(...board)
  expandedBoard.map(el => {
    if (el) {
      const name = `${el}`
      !Array.isArray(boats[name]) ? boats[name] = []: null;
      boats[name].push(el)
    }
  })

  info.notTouched = Object.values(boats).reduce((acc,el) => {
    return acc += el.length / el[0]
  }, 0)

  board.reverse();

  attacks.map(([y,x]) => {
    const hit = board[x-1][y-1];
    if (hit) {
      const hitName = `${hit}`;
      boats[hitName].pop()
      if (boats[hitName].length % hit == 0) {
        info.points += 1;
        info.sunk += 1;
        hit == 1 ? info.notTouched -= 1 : info.damaged -= 1
            // (boats[hitName].length + 1) % hit == 0 ? info.damaged += 1; info.notTouched -= 1 : info.damaged -= 1
      } else {
        info.points += 0.5;
        if ((boats[hitName].length + 1) % hit == 0) {
          info.damaged += 1;
          info.notTouched -=1;
        }
      }
        }
      })
      info.points -= info.notTouched
      return info
      }


// board = [[0,0,0,2,2,0],
//         [0,3,0,0,0,0],
//          [0,3,0,1,0,0],
//          [0,3,0,1,0,0]];
// attacks = [[2, 1], [1, 3], [4, 2]];
// console.log(damagedOrSunk(board, attacks));
