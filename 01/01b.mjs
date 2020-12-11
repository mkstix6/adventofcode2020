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
    sortedData.forEach((c) => {
      if (b >= c) {
        return false;
      }
      if (sumIsCorrect(a, b, c)) {
        console.log(
          `${a} + ${b} + ${c} = ${
            a + b + c
          } ∴ 01b answer = ${chalk.black.bgGreen(a * b * c)}`
        );
      }
    });
  });
});

export { sum, sumTarget, sumIsCorrect };
