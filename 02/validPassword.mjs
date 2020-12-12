/**
 * passwordObject = { min: 16, max: 19, letter: 'r', password: 'gbtxrqmrrrrrrrwrflw' }
 */

export default ({ min, max, letter, password }) => {
  // Filter letters down to just the special letter.
  const specialLetterArray = [...password].filter(
    (thisLetter) => thisLetter === letter
  );
  // Count the special letters.
  const specialLetterCount = specialLetterArray.length;
  // Check special letter count is within bounds.
  if (specialLetterCount >= min && specialLetterCount <= max) {
    return true;
  } else {
    return false;
  }
};
