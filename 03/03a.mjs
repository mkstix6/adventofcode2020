/**
 * Starting at the top-left corner of your map and following
 * a slope of right 3 and down 1, how many trees would
 * you encounter?
 */
import fs from "fs";
const data = fs.readFileSync("mapPattern.txt", "utf8");
const lines = data.split(/\r?\n/);

function checkTreeHit(pattern, index) {
  const progression = [1, 3];
  const patternLength = lines[0].length;
  const charToCheck = (index * progression[1]) % patternLength;
  if (pattern.charAt(charToCheck) === "#") {
    return true;
  } else {
    return false;
  }
}

const sum = (...args) => [...args].reduce((acc, val) => acc + val, 0);

const hits = sum(
  ...lines.map(checkTreeHit).map((boolean) => (boolean ? 1 : 0))
);

console.log({ hits });
