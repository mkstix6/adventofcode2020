/**
 * passwordObject = { position1: 16, position2: 19, letter: 'r', password: 'gbtxrqmrrrrrrrwrflw' }
 * Exactly one of these positions must contain the given letter.
 */

export default ({ position1, position2, letter, password }) => {
  const pos1IsMatch = password.charAt(position1 - 1) === letter;
  const pos2IsMatch = password.charAt(position2 - 1) === letter;
  if ((pos1IsMatch && !pos2IsMatch) || (!pos1IsMatch && pos2IsMatch)) {
    return true;
  } else {
    return false;
  }
};
