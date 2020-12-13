/**
 * Starting at the top-left corner of your map and following
 * a slope of right 3 and down 1, how many trees would
 * you encounter?
 */

import fs from "fs";
const data = fs.readFileSync("mapPattern.txt", "utf8");
const lines = data.split(/\r?\n/);

const progressions = [
  [1, 1],
  [1, 3],
  [1, 5],
  [1, 7],
  [2, 1],
];

const getCheckTreeHitCheckerForProgression = (progression) => {
  return (pattern, index) => {
    const patternLength = lines[0].length;
    const charToCheck = (index * progression[1]) % patternLength;
    if (pattern.charAt(charToCheck) === "#") {
      return true;
    } else {
      return false;
    }
  };
};

const sum = (...args) => [...args].reduce((acc, val) => acc + val, 0);

const pregressionHits = progressions.map((progression) => {
  const checkTreeHit = getCheckTreeHitCheckerForProgression(progression);
  // Filter lines down to just the ones we want to check.
  const lineSkip = progression[0];
  let linesToCheck = lines.filter((line, index) => !(index % lineSkip));
  // Count hits.
  const hits = sum(
    ...linesToCheck.map(checkTreeHit).map((boolean) => (boolean ? 1 : 0))
  );
  return hits;
});

const reduceProduct = (acc, val) => acc * val;
const finalProduct = pregressionHits.reduce(reduceProduct);
console.log(finalProduct);
