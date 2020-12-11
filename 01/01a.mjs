import chalk from "chalk";

import data from "./data.mjs";

const sumTarget = 2020;
const sum = (...args) => [...args].reduce((acc, val) => acc + val, 0);
const sumIsCorrect = (...args) => sum(...args) === sumTarget;

const sortedData = data.sort();

sortedData.forEach((a) => {
  sortedData.forEach((b) => {
    if (a >= b) {
      return false;
    }
    if (sumIsCorrect(a, b)) {
      console.log(
        `${a} + ${b} = ${a + b} ∴ 01a answer = ${chalk.black.bgGreen(a * b)}`
      );
    }
  });
});

export { sum, sumTarget, sumIsCorrect };
