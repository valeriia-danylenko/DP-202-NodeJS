import {nerdamer} from './node_modules/nerdamer/all.js';

export function calculateAllowedH(big, small) {
  const [l, h] = big;
  const [small_L, small_H] = small;
  const bigDiagonal = Math.sqrt(Math.pow(h, 2) + Math.pow(l, 2));
  nerdamer.set("SOLUTIONS_AS_OBJECT", true);
  const angled = nerdamer.solveEquations([
    `${l * l} = (${l}-x)^2 + (${h}-y)^2`,
    `y * (${h}-y) = x * (${l}-x)`
  ]);
  const maxWidth = Math.sqrt(Math.pow(angled.x, 2) + Math.pow(angled.y, 2));
  const extraLength = bigDiagonal - l;
  const tgTheta = Math.tan(Math.atan(maxWidth / extraLength));
  const allowedH = (bigDiagonal - small_L) * tgTheta;
  return small_H < allowedH ? true : false

}
