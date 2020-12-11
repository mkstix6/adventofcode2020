import data from "./data.mjs";

const sumTarget = 2020;
const sumIsCorrect = (a, b) => a + b === sumTarget;

const sortedData = data.sort();

sortedData.forEach((a) => {
  sortedData.forEach((b) => {
    if (a >= b) {
      return false;
    }
    if (sumIsCorrect(a, b)) {
      console.log(`${a} + ${b} = ${a + b} ∴ answer ${a * b}`);
    }
  });
});

export { sumTarget, sumIsCorrect };
