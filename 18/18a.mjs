import { evalMathString } from "./18a-evaluate-math-expression.mjs";

// Read in puzzle input data.
import fs from "fs";
const data = fs.readFileSync("puzzle-18-input-data.txt", "utf8");
const lines = data.split(/\r?\n/);

const answer = lines
  // Run for each.
  .map((inputExpression) => parseInt(evalMathString(inputExpression)))
  // Sum results.
  .reduce((acc, val) => acc + val, 0);

console.log(
  "18a answer: ",
  answer,
  answer === 21347713555555 ? "(Correct answer)" : "(Incorrect answer)"
);
// Corret answer for my input data was 21347713555555.
