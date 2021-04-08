export const isNum = function(num) {
  if (typeof num !== 'number' || isNaN(num) || (!isFinite(num)) ) return false
  return true
};
